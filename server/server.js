const app = require("./index");

const { testDbConnection } = require('./config/db');
require('dotenv').config();

app.listen(8080, async () => {
    console.log(`The server is listening...`);
    testDbConnection();
    try {
    } catch ( error ) {
        console.log(error);
    }
});