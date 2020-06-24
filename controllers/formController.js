const poolPromise = require("../models/connectDatabase");

module.exports = {
  getFormDataFromBuildingCode: async (req, res, _next) => {
    let { building_code } = req.params;
    try {
      const pool = await poolPromise;
      const result = await pool.query(
        `
        SELECT f.form_id, f.timestamp, f.building_code, b.building_name, f.floor, f.detail, MAX(dbm.percent) AS 'max',
        MIN(dbm.percent) AS 'min',COUNT(*) AS 'quantity', AVG(dbm.percent) AS 'average_percent'
        FROM form AS f, building AS b, ssid_dbm AS dbm
        WHERE b.building_code = ? AND f.building_code = b.building_code AND f.form_id = dbm.form_id
        GROUP BY f.form_id;
        `,
        [building_code]
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
