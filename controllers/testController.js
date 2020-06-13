const poolPromise = require("../models/connectDatabase");

module.exports = {
  getTest: async (req, res, _next) => {
    try {
      const pool = await poolPromise;
      const result = await pool.query("SELECT * FROM test where a = ?", [
        req.params.text,
      ]);
      res.status(200).json({
        result: [...result],
      });
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  },
};
