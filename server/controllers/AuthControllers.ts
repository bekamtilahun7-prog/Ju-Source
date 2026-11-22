import { Request, Response } from "express";
import User from "../Models/User.js";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    //setting user data in session
    req.session.isLoggedIn = true;
    req.session.userId = newUser._id;

    return res.json({
      message: "account created sucessfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //setting user data in session
    req.session.isLoggedIn = true;
    req.session.userId = user._id;

    return res.json({
      message: "Logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: "Error logging in user" });
  }
};
//controllers for user logout
export const logOutUser = async (req: Request, res: Response) => {
  req.session.destroy((error: any) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  });
  return res.json({ message: "Logged out successfully" });
};
//controller for verifying user
export const verifyUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.json({ message: "User verified successfully", user });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

