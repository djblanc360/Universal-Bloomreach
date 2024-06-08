require('dotenv').config()
console.log('process.env.OLUKAI_EXPONEA_TOKEN: ', process.env.OLUKAI_EXPONEA_TOKEN) // remove this after you've confirmed it is working
// console.log('process.env',process.env)
const serverless = require("serverless-http");

const app = require('./src/index');

module.exports.handler = serverless(app);
