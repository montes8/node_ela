require('dotenv').config();
const Server = require('./models/server');


const server = new Server();

var ip = require("ip");
console.log( ip.address() );

server.listen();