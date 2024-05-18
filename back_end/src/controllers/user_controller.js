const db = require("../models/index.js");

const getAvatar = async (req, res) => {
  // 0 - 20
  return res.sendFile(`/backend/src/avatar/${req.query?.filename}`);
}

module.exports = { getAvatar }