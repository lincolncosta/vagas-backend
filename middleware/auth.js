const jwt = require("jsonwebtoken");


module.exports = function(req, res, next) {
  const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Passa esse token direito seu arrombado", error: "Authentication error" });

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded.user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send({ error: "Invalid token", message: "Erro ao validar esse token" });
  }
};