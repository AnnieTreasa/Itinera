const neo4jDriver = require('neo4j-driver');

require('dotenv').config()

const {
    url,
    db_username,
    db_password
}=process.env
const driver = neo4jDriver.driver(url, neo4jDriver.auth.basic(db_username, db_password));
const session = driver.session();


module.exports = driver;
