import express from "express";
import { Link } from "../models/Link.js";
import { isValidUrl, codeRegex } from "../utils/validators.js";

const router = express.Router();

// Create link
// POST /api/links
router.post("/links", async (req, res) => {
  try {
    const { url, code } = req.body;
    if (!url || !isValidUrl(url)) {
      return res.status(400).json({ error: "Invalid or missing url. Include protocol, e.g. https://..." });
    }
    let finalCode = code;
    if (finalCode) {
      if (!codeRegex.test(finalCode)) {
        return res.status(400).json({ error: "Custom code must match [A-Za-z0-9]{6,8}" });
      }
      const existing = await Link.findByPk(finalCode);
      if (existing) return res.status(409).json({ error: "Code already exists" });
    } else {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const gen = () => Array.from({length:6}).map(()=>alphabet[Math.floor(Math.random()*alphabet.length)]).join("");
      let attempts = 0;
      do {
        finalCode = gen();
        attempts++;
        if (attempts > 5) finalCode += Math.floor(Math.random()*1000);
      } while (await Link.findByPk(finalCode));
    }

    const created = await Link.create({ code: finalCode, targetUrl: url });
    return res.status(201).json({
      code: created.code,
      url: created.targetUrl,
      clicks: created.clicks,
      lastClicked: created.lastClicked,
      createdAt: created.createdAt
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// List all links
// GET /api/links
router.get("/links", async (req, res) => {
  try {
    const links = await Link.findAll({ order: [["createdAt", "DESC"]] });
    return res.json(links.map(l => ({
      code: l.code,
      url: l.targetUrl,
      clicks: l.clicks,
      lastClicked: l.lastClicked,
      createdAt: l.createdAt
    })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Stats for one code
// GET /api/links/:code
router.get("/links/:code", async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.code);
    if (!link) return res.status(404).json({ error: "Not found" });
    return res.json({
      code: link.code,
      url: link.targetUrl,
      clicks: link.clicks,
      lastClicked: link.lastClicked,
      createdAt: link.createdAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete
// DELETE /api/links/:code
router.delete("/links/:code", async (req, res) => {
  try {
    const link = await Link.findByPk(req.params.code);
    if (!link) return res.status(404).json({ error: "Not found" });
    await link.destroy();
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
