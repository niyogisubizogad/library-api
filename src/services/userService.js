import * as userRepository from "../repositories/userRepository.js";
import {signJWT} from "../utils/signJWT.js"
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const createNewUser = async ({ name, email, password }) => {
  const passwordHash = await bcrypt.hash(password.trim(), 10);
  const newUser = {
    id: uuid(),
    name,
    role:"member",
    email,
    passwordHash:passwordHash,
    createdAt: new Date().toISOString(),
  };
  return await userRepository.create(newUser);
};

const login = async ({email}) => {
  const user = await userRepository.findByEmail(email);

 return await signJWT(user)
};

const findUserById = async (id)=>{
  const user =  await userRepository.findById(id);
  return user;
}
export { createNewUser,login,findUserById};
