
// Jwt
const jwt = require("jsonwebtoken");

// Configs
const configs = require("../../config");

// User
const User = require("../user/model");

// protect
exports.protect = async (req, res, next) => {
  try {
    // Check if there is a cookie with the token on the request header
    let token = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(new Error("Please login."));

    // Verify the token or decode it
    const decodedData = jwt.verify(token, configs.jwtSecret);

    // user
    let user = "";

    // Check the role of the user
    if (
      decodedData.role === "Admin" ||
      decodedData.role === "User"
    ) {
      user = await User.findById(decodedData.id);

      // Check if the user exists
      if (!user) return next(new Error("User does not exist."));

      // Check if the status of the account is active
      // if (user.adminStatus !== "Active")
      //   return next(new Error("This account is currently inactive"));

    //   // Check if the admin has started password reset process
    //   if (
    //     user.passwordResetOtp 
    //     user.passwordResetOtpExpires 
    //     user.passwordResetOtpStatus
    //   ) {
    //     return next(
    //       new AppError(
    //         "You recently started password resetting process. But never finished resetting. Please login again for security purpose.",
    //         400
    //       )
    //     );
    //   }

      // Check if password is changed
    //   if (user.checkPasswordChange(decodedData.iat)) {
    //     return next(
    //       new Error(
    //         "You recently changed password. Please login again."
    //       )
    //     );
    //   }

    //   // Check if user changed phone number
    //   if (user.checkPhoneNumberChange()) {
    //     return next(
    //       new Error(
    //         "You have recently changed phone number in your profile. Please login again."
    //       )
    //     );
    //   }
    }

    // Set the user data on the request object for furhter usage
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};