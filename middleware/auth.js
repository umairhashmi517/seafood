const passport = require('passport')
module.exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({
      status:401,
      message:"not authenticated"
    })
  }
};