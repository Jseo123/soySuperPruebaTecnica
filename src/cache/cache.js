const NodeCache = require("node-cache");
const cache = require("node-cache");

const myCache = new NodeCache({ stdTTL: 300, checkperiod: 301 });

module.exports = { myCache };
