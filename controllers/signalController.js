const poolPromise = require("../models/connectDatabase");

module.exports = {
  getDbm: async (req, res, _next) => {
    let { building_code, form_id } = req.params;
    try {
      const pool = await poolPromise;
      const result = await pool.query(
        `
            SELECT f.form_id, f.timestamp, f.building_code, b.building_name, f.floor, f.detail, dbm.ssid, dbm.mac_address, 
            dbm.chanel, dbm.dbm, dbm.percent
            FROM form AS f, building AS b, ssid_dbm AS dbm
            WHERE b.building_code = ? AND f.form_id = ? AND f.building_code = b.building_code AND dbm.form_id = f.form_id;
        `,
        [building_code, form_id]
      );
      res.status(200).json({
        status: "success",
        result: [...result],
      });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        message: err.message,
        result: { ...err },
      });
    }
  },
  getChannelCounter: async (req, res, _next) => {
    let { form_id } = req.params;
    try {
      const pool = await poolPromise;
      const result = await pool.query(
        `
          SELECT *
          FROM ssid_count AS sc
          WHERE sc.form_id = ?
        `,
        [form_id]
      );
      res.status(200).json({
        status: "success",
        result: [...result],
      });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        message: err.message,
        result: { ...err },
      });
    }
  },
};
