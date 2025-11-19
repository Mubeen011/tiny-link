import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Link = sequelize.define("Link", {
  code: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    validate: { len: [6, 8], is: /^[A-Za-z0-9]{6,8}$/i }
  },
  targetUrl: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  clicks: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  lastClicked: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: "links",
  timestamps: true,
});
