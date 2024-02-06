import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

declare module 'express-session' {
  interface SessionData {
    messages: string[];
  }
}

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => {
  // console.log("this: " + req.session.messages)
  res.render("login", {messages: req.session.messages?.pop()});
})

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
