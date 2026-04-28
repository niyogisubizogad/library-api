import bcrypt from "bcrypt";
import { findUser } from "../repositories/userRepository.js";


const emailTaken = async (req, res, next) => {
  const { email } = req.body;
  const [{dataValues}] = await findUser(email)
  if (dataValues.email) {
    return res.status(409).json({
      success: false,
      message: "An account with this email already exists",
    });
  }
  next();
};
const validateUserCredential = async (req, res, next) => {
  const { email, password } = req.body;
  const [{dataValues}]= await findUser(email);
  if (!dataValues) {
    return res.status(401).json({
      success: false,
      message: "Invalid email ",
    });
  }
  const password_match = await bcrypt.compare(password, data.dataValues.password);

  if(!password_match){
     return res.status(401).json({
      success: false,
      message: "Invalid password",
    });
  }

  next();
};


export { validateUserCredential,emailTaken };
