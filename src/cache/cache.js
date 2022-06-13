const NodeCache = require("node-cache");

const cache = new NodeCache({ stdTTL: 300, checkperiod: 301 });

async function cached(key, fn) {
  let value = cache.get(`${key}`);

  if (!value) {
    value = await fn();
    cache.set( `${key}`, value );
  }

  return value;
}

module.exports = { cached };
