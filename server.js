require('dotenv').config();
const server = require('./app');
const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`this app listening on port ${port}!`);
});