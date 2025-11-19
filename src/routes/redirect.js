import express from "express";
import { Link } from "../models/Link.js";

const router = express.Router();

// Health
router.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});

// Redirect: GET /:code
router.get("/:code", async (req, res, next) => {
  const code = req.params.code;
  if (code === "api" || code === "code" || code === "healthz") return next();
  try {
    const link = await Link.findByPk(code);
    if (!link) return res.status(404).send("Not found");
    link.clicks = link.clicks + 1;
    link.lastClicked = new Date();
    await link.save();
    return res.redirect(302, link.targetUrl);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

export default router;
