const mariadb = require('mariadb');
const { dbConfig } = require('../configs');

const poolPromise = mariadb.createPool(dbConfig);

poolPromise.getConnection()
    .then(conn => conn)
    .catch(err => console.log("Database Connection Failed! Bad Config: ", err))

module.exports = poolPromise;