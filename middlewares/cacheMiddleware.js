const NodeCache = require("node-cache");

const cache = new NodeCache();

const getUrlFromRequest = (req) => {
  const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  return url;
};

const get = (req, res, next) => {
  const content = cache.get(getUrlFromRequest(req));
  if (content) {
    return res.status(200).send(content);
  }
  return next();
};

const set = (req, res, next) => {
  cache.set(getUrlFromRequest(req), res.locals.data);
  res.status(200).json(res.locals.data);
};

const clear = (req, res, next) => {
  const resourceKeys = cache.keys().filter((key) => key.includes(req.baseUrl));
  cache.del(resourceKeys);
  return next();
};

module.exports = { get, set, clear };
