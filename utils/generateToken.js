const jwt = require('jsonwebtoken')
const configs = require('../config.js') 


module.exports = (data) => {
    //console.log("secret", configs.jwtSecret)
    const token = jwt.sign({id: data.id, role: data.role }, configs.jwtSecret);
  
    return token;

  }