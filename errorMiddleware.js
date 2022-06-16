module.exports = (err, _req, res, _next) => {
  if (err.code && err.status) {
    return res.ststus(err.status).json({ message: err.message, code: err.code });
  }
  return res.status(500).jscon({ message: err.code });
}