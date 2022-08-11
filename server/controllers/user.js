import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

const secret = "test";

//function to signin an exisitng user
export const signin = async (req, res) => {
  //extracting email and password from request
  const { email, password } = req.body;

  try {
    //finding if user exists
    const oldUser = await UserModal.findOne({ email });

    //if user doesnot exist send a 404 error
    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    //comapring the password
    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    //if password not match send a 400 error message
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    //generating a json web token
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "1h",
    });

    //sending the user and token as response
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    //sending 404 status and error message if something goes wrong
    res.status(500).json({ message: "Something went wrong" });
  }
};

//function to create a new user
export const signup = async (req, res) => {
  //extracting data from request
  const { email, password, firstName, lastName } = req.body;

  try {
    //checking if user already exists
    const oldUser = await UserModal.findOne({ email });

    //if user exists already sending  a 400 error
    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    //hashing the password
    const hashedPassword = await bcrypt.hash(password, 12);

    //creating a new user
    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    //generating a json web token
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    //sending user and token as response
    res.status(201).json({ result, token });
  } catch (error) {
    //sending 404 status and error message if something goes wrong
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
