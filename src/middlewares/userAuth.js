const jwt = require('jsonwebtoken');

const requireAuth = async (req, res, next) => {
  const usertoken = await req.headers.cookie;
  const Authorization = usertoken.split(" ")[0];
  const token = Authorization.split("=")[1].replace(";", "");
  
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({ error: 'Unauthorized' });
  }
};

module.exports = requireAuth;
