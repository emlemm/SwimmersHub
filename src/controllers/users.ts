import { User, UserWithoutPassword } from "../models/user";
import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

function validateUserBody(body: any) {
  if (!body || Object.keys(body).length === 0) return "Request body cannot be empty.";
  if (!body.firstName) return "First name is required.";
  if (!body.lastName) return "Last name is required.";
  if (!body.email) return "Email is required.";
  if (!body.password) return "Password is required.";
  if (typeof body.coachRole !== "boolean") return "Coach role is required."
  return null;
}

export const createNewUser = async (req: Request, res: Response) => {
  const validationError = validateUserBody(req.body);
  if (validationError) return res.status(400).json({ message: validationError });

  const hashedPassword = await bcrypt.hashSync(req.body.password, 10);
  const user = await User.create({...req.body, password: hashedPassword});
    res.status(201).json(user);
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({email});
  if (!user) {
    res.status(400).json({message: "User or password incorrect, please try again."})
    return;
  }; 

  if (await bcrypt.compare(password, user.password)) {  
    const userWithoutPassword: UserWithoutPassword = {firstName: user.firstName, lastName: user.lastName, email: user.email, coachRole: user.coachRole};
    const accessToken = jwt.sign(userWithoutPassword, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: 3600 * 1000 })
    
    if(process.env.NODE_ENV === 'development') {
      res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 })
    } else {
      res.cookie("jwt", accessToken, { httpOnly: true, secure: true, maxAge: 3600 * 1000 })
    }
    
    return res.status(200).json({message: "Success"});

  } else {
    res.status(400).json({message: "User or password incorrect, please try again."})
    return;
  };
};