import { Request, Response } from "express";
import prisma from "../utils/prismaClient";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";
import { setCookie } from "../utils/cookieUtils";
import { clearCookie } from "../utils/cookieUtils";

(exports.register = async (req: Request, res: Response) => {
  const { username, email, password, name, address, phone } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return res.status(404).json({
        error: "Username or email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        name,
        password: hashedPassword,
        address,
        phone,
      },
    });

    res.status(200).json({
      message: "Registration successfull",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Registration failed." });
  }
}),
  (exports.login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        return res.status(404).json({ error: "User not found." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid credentials." });
      }

      const token = generateToken(user);

      // Set the token as an HTTP-only cookie using the setCookie utility function
      setCookie(res, "token", token, {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      });

      res.status(200).json({
        message: "Login Successful !",
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

exports.logout = async (req: Request, res: Response) => {
  // Clear the token cookie using the clearCookie utility function
  clearCookie(res, "token");
  res.status(200).json({ message: "Logged out successfully." });
};
