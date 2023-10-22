const jwt = require("jsonwebtoken");

const requireAuth = async (req, res, next) => {
  const usertoken = await req.headers.cookie;
  
  if (!usertoken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const Authorization = usertoken.split(" ")[0];
  const token = Authorization.split("=")[1].replace(";", "");

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      } else {
        req.user = decoded;
        if (req.user.payload.verified !== true) {
          console.log(req.user)
          return res.status(401).json({ error: "Your account unverify, pelase verify your account" });
        }
        next();
      }
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = requireAuth;
