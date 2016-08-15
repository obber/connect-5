import passport from "passport";
import FacebookStrategy from "passport-facebook";
import queryString from "query-string";

import { appId, appSecret } from "./config";
import { app, hostname } from "../common";
import * as dbh from "../db/userHelpers";

const facebookStrategyGateway = (accessToken, refreshToken, profile, cb) => {
  const facebookId = profile.id;
  const user = { accessToken, refreshToken, profile };

  // check if this facebook id exists in our db
  dbh.exists("users", { facebookId })
    .then(userExists => {
      // update the existing user's token to the latest one we receive from Fbook.
      if (userExists) {
        dbh.update("users", { facebookId }, { accessToken })
          .then(resp => {
            if (resp) {
              return cb(null, user);
            }
            throw new Error("Update called in auth.js, but no users were updated");
          })
          .catch(resp => { 
            throw new Error("failed updating user in auth.js. resp = ", resp);
          });

      // otherwise, we create a new user
      } else {
        dbh.insert("users", { accessToken, facebookId })
          .then(resp => {
            if (resp) {
              return cb(null, user);
            }
            throw new Error("Update called in auth.js, but no users were updated");
          })
          .catch(resp => { 
            throw new Error("failed creating user in auth.js. resp = ", resp);
          });
      }
  });
};

passport.use(new FacebookStrategy({
    clientID: appId,
    clientSecret: appSecret,
    callbackURL: `http://${hostname}/auth/facebook/callback`
}, facebookStrategyGateway));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.get("/isLoggedIn", (req, res) => {
  // get token/id from query params or headers (localStorage on client side)
  const query = req.url.replace(/\/isLoggedIn/, "");
  const parsed = queryString.parse(query);
  const token = parsed.t || req.headers.c5token;
  const id = parsed.id || req.headers.c5id;

  const status = { loggedIn: false };

  // check to make sure token and facebook id match in database
  if (token && id) {
    dbh.verifyToken(token, id)
      .then(valid => {
        if (valid) {
          status.loggedIn = true;
          res.json(Object.assign(status, { id, token }));
        } else {
          res.json(status);
        }
      });

  // if no token or fbid is provided, they are not logged in
  } else {
    res.json(status);
  }
});

app.get("/auth/facebook", passport.authenticate("facebook"));

app.get("/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login.html" }),
  (req, res) => {
    // Successful authentication, redirect home with profile/token query params
    res.redirect(`/?id=${req.user.profile.id}&t=${req.user.accessToken}&`);
  });

app.get("/logout", (req, res) => {
  console.log("logout");
  req.logout();
  res.redirect("/login.html");
});
