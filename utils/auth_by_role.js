const User = require("../api/user/model")


const authByRole = (allowedRoles) => {
    return async(req, res, next) => {

      const id = req.params._id;

      const users = await User.findOne(id); 
  
      console.log(users)

      if (!users) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      let userRole = users.role; 
  
      const hasAllowedRole = allowedRoles.some((role) => userRole === role);
  
      // console.log('user.role:', userRole);
      // console.log('allowedRoles:', allowedRoles);
      // console.log('hasAllowedRole:', hasAllowedRole);
      

      if (hasAllowedRole) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden' });
      }
    };
  };
  
  
  
  
  
  
  module.exports = authByRole