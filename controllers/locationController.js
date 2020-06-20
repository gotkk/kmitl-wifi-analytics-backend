const poolPromise = require("../models/connectDatabase");

module.exports = {
  getLatLng: async (_req, res, _next) => {
    try {
      const pool = await poolPromise;
      const result = await pool.query(`
        SELECT b_location.*, b_avg.quantity, b_avg.avg_percent
        FROM 
          (
            SELECT l.building_code, b.building_name, l.location_code, l.lat, l.lng
            FROM location AS l
            JOIN building AS b ON l.building_code  = b.building_code
            ORDER BY l.building_code, l.location_code
          ) b_location
        LEFT JOIN 
          (
            SELECT f.building_code, COUNT(*) AS 'quantity', AVG(dbm.percent) AS 'avg_percent'
            FROM form AS f, building AS b, ssid_dbm AS dbm
            WHERE f.building_code = b.building_code AND f.form_id = dbm.form_id
            GROUP BY f.building_code
          ) b_avg
        ON (b_location.building_code = b_avg.building_code)
      `);

      let filterResult = [];
      if (result.length > 0) {
        filterResult = [
          {
            buildingCode: result[0].building_code,
            buildingName: result[0].building_name,
            quantity: result[0].quantity,
            avg_percent: result[0].avg_percent,
            location: [
              {
                locationCode: result[0].location_code,
                lat: result[0].lat,
                lng: result[0].lng,
              }
            ],
          },
        ];

        for (let i = 1, arri = result.length; i < arri; ++i) {
          if (result[i].building_code !== result[i - 1].building_code) {
            filterResult = [
              ...filterResult,
              {
                buildingCode: result[i].building_code,
                buildingName: result[i].building_name,
                quantity: result[i].quantity,
                avg_percent: result[i].avg_percent,
                location: [],
              },
            ];
          }
          for (let j = 0, arrj = filterResult.length; j < arrj; ++j) {
            if (result[i].building_code === filterResult[j].buildingCode) {
              filterResult[j] = {
                ...filterResult[j],
                location: [
                  ...filterResult[j].location,
                  {
                    locationCode: result[i].location_code,
                    lat: result[i].lat,
                    lng: result[i].lng,
                  },
                ],
              };
              break;
            }
          }
        }
      }

      res.status(200).json({
        status: "success",
        result: [...filterResult],
      });
    } catch (err) {
      res.status(500).json({
        status: "failed",
        message: err.message,
        result: {...err}
      })
    }
  },
};
