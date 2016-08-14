import passport from "passport";
import FacebookStrategy from "passport-facebook";
import queryString from "query-string";

import { appId, appSecret } from "./config";
import { app, hostname } from "../common";
import { exists, insert } from "../db/userHelpers";

passport.use(new FacebookStrategy({
    clientID: appId,
    clientSecret: appSecret,
    callbackURL: `http://${hostname}/auth/facebook/callback`
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log("profile = ", profile);
    exists("users", { facebookId: profile.id })
      .then(userExists => {
        if (!userExists) {
          insert("users", { 
            accessToken,
            facebookId: profile.id 
          })
            .catch(resp => { 
              throw new Error(resp);
            });
        }
    });
    const user = { accessToken, refreshToken, profile };
    cb(null, user);
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
  const token = queryString.parse(query).accessToken;
  if (token) {
    res.json({ loggedIn: true });
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
    res.redirect(`/?accessToken=${req.user.accessToken}&`);
  });

app.get("/logout", (req, res) => {
  console.log("logout");
  req.logout();
  res.redirect("/login.html");
});
