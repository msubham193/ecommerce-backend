import jwt from "jsonwebtoken";
export const generateToken = (user: any) => {
  return jwt.sign({ userEmail: user.email }, process.env.SECRET_KEY as string, {
    expiresIn: "1d",
  });
};
