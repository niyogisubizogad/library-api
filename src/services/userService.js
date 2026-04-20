import * as userRepository from "../repositories/userRepository.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import { emailTaken } from "../middleware/validateUserAccount.js";

const createNewUser = async ({ name, role, email, password }) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = {
    id: uuid(),
    name,
    role:"member",
    email,
    password:passwordHash,
    createdAt: new Date().toISOString(),
  };
  return await userRepository.createUser(newUser);
};

const login = async ({email}) => {
    
  const user = await userRepository.findUser(email);
  return user;
};
export { createNewUser,login};
