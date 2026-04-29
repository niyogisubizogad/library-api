import bcrypt from "bcrypt";
import { findByEmail } from "../repositories/userRepository.js";


const emailTaken = async (req, res, next) => {
  const { email } = req.body;
  const user = await findByEmail(email);
  if (user !== null) {
    return res.status(409).json({
      success: false,
      message: "An account with this email already exists",
    });
  }
  next();
};
const validateUserCredential = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findByEmail(email);
  if (user === null) {
    return res.status(401).json({
      success: false,
      message: "Invalid email ",
    });
  }
 const userObj = user.toJSON();
 const { passwordHash } = userObj;

const password_match = await bcrypt.compare(password.trim(), passwordHash);

  if(!password_match){
     return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }
  next();
};


export { validateUserCredential,emailTaken };
