const Users = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'kasfjslkmdlj@##%$#frI45YU8N34J09J2M';

module.exports.requireAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        return res.status(401).send('Permission denied');
      } else {
        const user = await Users.findById(decodedToken.id.user);
        if (user) {
          req.user = user;
          next();
        }
        else return res.status(403).send('Permission denied');
      }
    });
  } else return res.status(401).send('Permission denied');
};