const jwt = require("jsonwebtoken");

const requireAdmin = async (req, res, next) => {
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
        if (req.user && req.user.payload.role === "admin") {
          if(req.user.payload.verified !== true){
            return res.status(401).json({ error: "Unverified" });
          }
            next();
          } else {
            return res.status(403).json({ error: "Forbidden" });
          }
      }
    });
  } else {
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = requireAdmin;
