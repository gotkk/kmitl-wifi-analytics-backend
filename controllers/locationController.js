const poolPromise = require("../models/connectDatabase");

module.exports = {
  getLatLng: async (_req, res, _next) => {
    try {
      const pool = await poolPromise;
      const result = await pool.query(`
        SELECT l.buildingcode, b.buildingname, l.locationcode, l.Latitude, l.Longitude
        FROM location AS l
        JOIN building AS b ON l.buildingcode  = b.buildingcode
      `);
      let buildingCode = [];
      let buildingName = [];
      let filterResult = [];

      result.forEach((item, _index) => {
        buildingCode = [...buildingCode, item.buildingcode];
        buildingName = [...buildingName, item.buildingname];
      });
      buildingCode = [...new Set(buildingCode)];
      buildingName = [...new Set(buildingName)];

      buildingCode.forEach((item, index) => {
        filterResult = [
          ...filterResult,
          {
            buildingcode: item,
            buildingname: buildingName[index],
            location: [],
          },
        ];
      });

      let building = [];
      if (result.length > 0) {
        building = [
          {
            buildingcode: result[0].buildingcode,
            buildingname: result[0].buildingname,
            location: [],
          },
        ];

        for (let i = 1, arri = result.length; i < arri; ++i) {
          if (result[i].buildingcode !== result[i - 1].buildingcode) {
            building = [
              ...building,
              {
                buildingcode: result[i].buildingcode,
                buildingname: result[i].buildingname,
                location: [],
              },
            ];
          }
        }
      }


      for (let i = 0, arri = result.length; i < arri; ++i) {
        for (let j = 0, arrj = filterResult.length; j < arrj; ++j) {
          if (result[i].buildingcode === filterResult[j].buildingcode) {
            filterResult[j] = {
              ...filterResult[j],
              location: [
                ...filterResult[j].location,
                {
                  locationcode: result[i].locationcode,
                  latitude: result[i].Latitude,
                  longitude: result[i].Longitude,
                },
              ],
            };
            break;
          }
        }
      }

      res.status(200).json({
        result: [...filterResult],
      });
    } catch (err) {
      res.status(500);
      res.send(err.message);
    }
  },
};
