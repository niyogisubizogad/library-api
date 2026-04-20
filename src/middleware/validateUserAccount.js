import { users } from "../store/inMemoryStore.js";
import bcrypt from "bcrypt";


const emailTaken = async (req, res, next) => {
  const { email } = req.body;
  const takenEmails = users.map((user) => user.email);
  if (takenEmails.includes(email)) {
    return res.status(409).json({
      success: false,
      message: "An account with this email already exists",
    });
  }
  next();
};
const validateUserCredential = async (req, res, next) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email);
 
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }
  const password_match = await bcrypt.compare(password, user.password);

  if(!password_match){
     return res.status(401).json({
      success: false,
      message: "Invalid email or password",
    });
  }

  next();
};

export { emailTaken, validateUserCredential };
