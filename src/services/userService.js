import * as userRepository from "../repositories/userRepository.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";

const createNewUser = async ({ name, email, password }) => {
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
    
  const [{dataValues}] = await userRepository.findUser(email);
  return dataValues;
};
const findUserById = async (id)=>{
  const [{dataValues}] =  await userRepository.findById(id);
  return dataValues;
}
export { createNewUser,login,findUserById};
