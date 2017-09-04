module.exports = (req, res, next) => {
  req.user = {sdfasf:123}
  if (!req.user) {
    return res.status(404).send({error: 'You must log in!'});
  }

  next();
}
