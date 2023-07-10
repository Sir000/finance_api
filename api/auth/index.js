const user = require("../user/model")

// Check role
module.exports = (...roles) => {

  return (req, res, next) => {
    console.log("UR", req.user);
    if (!roles.includes(req.user.role)) {
      
      return next(new Error("Access Denied"));
    }
    next();
  };
};
