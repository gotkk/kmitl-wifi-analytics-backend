const poolPromise = require("../models/connectDatabase");

module.exports = {
  getLatLng: async (_req, res, _next) => {
    try {
      const pool = await poolPromise;
      const result = await pool.query(`
        SELECT l.buildingcode, b.buildingname, l.locationcode, l.Latitude, l.Longitude
        FROM location AS l
        JOIN building AS b ON l.buildingcode  = b.buildingcode
        ORDER BY l.buildingcode, l.locationcode
      `);

      let filterResult = [];
      if (result.length > 0) {
        filterResult = [
          {
            buildingCode: result[0].buildingcode,
            buildingName: result[0].buildingname,
            location: [
              {
                locationCode: result[0].locationcode,
                lat: result[0].Latitude,
                lng: result[0].Longitude,
              }
            ],
          },
        ];

        for (let i = 1, arri = result.length; i < arri; ++i) {
          if (result[i].buildingcode !== result[i - 1].buildingcode) {
            filterResult = [
              ...filterResult,
              {
                buildingCode: result[i].buildingcode,
                buildingName: result[i].buildingname,
                location: [],
              },
            ];
          }
          for (let j = 0, arrj = filterResult.length; j < arrj; ++j) {
            if (result[i].buildingcode === filterResult[j].buildingCode) {
              filterResult[j] = {
                ...filterResult[j],
                location: [
                  ...filterResult[j].location,
                  {
                    locationCode: result[i].locationcode,
                    lat: result[i].Latitude,
                    lng: result[i].Longitude,
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
