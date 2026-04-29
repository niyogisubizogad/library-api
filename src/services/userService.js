import * as userRepository from "../repositories/userRepository.js";
import { v4 as uuid } from "uuid";
import bcrypt from "bcrypt";
import "dotenv/config"
import jwt from "jsonwebtoken";

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

  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role:user.role
      
    },
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
  );
  console.log(token)
  const {id,name,role,} = user  
  return {id,name,email,role,token};
};

const findUserById = async (id)=>{
  const user =  await userRepository.findById(id);
  return user;
}
export { createNewUser,login,findUserById};
