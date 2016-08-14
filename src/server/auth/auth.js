import passport from "passport";
import FacebookStrategy from "passport-facebook";
import queryString from "query-string";

import { appId, appSecret } from "./config";
import { app, hostname } from "../common";
import * as dbh from "../db/userHelpers";

passport.use(new FacebookStrategy({
    clientID: appId,
    clientSecret: appSecret,
    callbackURL: `http://${hostname}/auth/facebook/callback`
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log("profile = ", profile);
    const facebookId = profile.id;
    const user = { accessToken, refreshToken, profile };

    dbh.exists("users", { facebookId })
      .then(userExists => {
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
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get("/isLoggedIn", (req, res) => {
  // next, we should check if the user token matches token stored in db
  const query = req.url.replace(/\/isLoggedIn/, "");
  const parsed = queryString.parse(query);
  const token = parsed.t;
  const fbid = parsed.id;

  // check to make sure token and fbid match in database
  if (token && fbid) {
    dbh.verifyToken(token, fbid)
      .then(valid => {
        if (valid) {
          res.json({ loggedIn: true });
        } else {
          res.json({ loggedIn: false });
        }
      });
  } else {
    res.json({ loggedIn: false });
  }
});

app.get("/auth/facebook",
  passport.authenticate("facebook"));

app.get("/auth/facebook/callback", passport.authenticate("facebook", {
    failureRedirect: "/login.html"
  }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect(`/?id=${req.user.profile.id}&t=${req.user.accessToken}&`);
  });

app.get("/logout", (req, res) => {
  console.log("logout");
  req.logout();
  res.redirect("/login.html");
});
