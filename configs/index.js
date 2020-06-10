var dbConfig = {
    host: process.env.DBHost,
    user: process.env.DBUser,
    password: process.env.DBPassword,
    database: process.env.DBName,
    connectionLimit: process.env.DBConnectLimit,
}

module.exports = {
    dbConfig
}