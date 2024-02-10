import express, { Request } from "express";
const router = express.Router();
import { ensureAuthenticated, ensureAdmin } from "../middleware/checkAuth";

const getAllSessions = (req: Request) => {
  return new Promise((resolve, reject) => {
  if (!req.sessionStore.all){
    throw new Error("no sessions exist")
  }
  req.sessionStore.all((err, res) => {
    if (err){
      return reject(err)
    } else {
      return resolve(res)
    }
  })
})
}

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, ensureAdmin, async (req, res) => {

    const allSessions = await getAllSessions(req);
    console.log(allSessions)
  res.render("admin", {
    user: req.user,
    allSessions
  });
})

export default router;
