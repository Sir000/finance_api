const User = require("./model");
const createJwt = require("../../utils/generateToken");
const axios = require("axios");
const readline = require("readline");
const fetchData = require("../../utils/apiServices");

exports.createUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, role, password, confirmPassword } =
      req.body;
    if (!firstName || !lastName) {
      //console.log("required names")
      return next(new Error("names required"));
    }

    let user;

    user = await User.find({ email });
    if (user.length > 0) {
      return next(new Error("already exists"));
    }

    user = await User.create({
      firstName,
      lastName,
      email,
      role,
      password,
      confirmPassword,
    });

    res.status(200).json({
      status: "SUCCESS",
      data: { user },
      message: "Successfully registered",
    });
  } catch (err) {
    console.log("err while creating a user");
    return next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    const users = await User.findById(id);
    console.log(users);

    if (!users) {
      return next(new Error("user not found"));
    }
    
    await User.findByIdAndDelete(id);
    //   console.log(deletedUser)
    res.status(200).json({
      status: "SUCCESS",
      message: "Successfully Deleted"
    });
  } catch (err) {
    console.log("err while deleting a user");
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(new Error("user not found"));
    }

    if (!user || !(await user.checkPassword(password, user.password))) {
      return next(new Error("Login credintials are incorrect"));
    }

    const token = createJwt({ id: user.id, role: user.role });

    res.status(200).json({
      status: "SUCCESS",
      data: {
        user,
      },
      token,
      message: "Successfully logged in",
    });
  } catch (err) {
    console.log("err while login");
    return next(err);
  }
};

exports.search = async (req, res) => {
  try {
    const { searchQuery } = req.body;

    const response = await fetchData(searchQuery);
    console.log(response.data.data);
    res.status(200).json({
      status: "SUCCESS",
      data: {
        searchData: response.data.data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
