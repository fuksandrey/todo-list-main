function cors(req, res, next) {
  res.header("Acess-Control-Allow-Origin", "*");
  res.header("Acess-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
  res.header("Acess-Control-Allow-Headers", "Content-Type");

  next();
}

module.exports = cors;
