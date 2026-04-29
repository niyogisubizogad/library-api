import jwt from "jsonwebtoken";

const verifyJWT = (req, res, next) => {
  return jwt.verify( process.env.JWT_SECRET);
};
export {verifyJWT}