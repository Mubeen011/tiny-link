import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
import { sequelize } from "./db.js";
import apiRoutes from "./routes/api.js";
import redirectRoutes from "./routes/redirect.js";
import {Link} from "./models/Link.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/api", apiRoutes);


app.get("/code/:code", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "code.html"));
});

app.use("/", redirectRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("DB connected and synced");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start", err);
    process.exit(1);
  }
})();
