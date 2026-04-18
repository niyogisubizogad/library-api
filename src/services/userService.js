import { createUser } from "../repositories/userRepository.js";
import  {v4 as uuid}  from "uuid";
import bcrypt from 'bcrypt';

const createNewUser = async ({name, role, email, password}) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
        id:uuid(),
        name,
        role,
        email,
        createdAt:new Date().toISOString()
    };
    return await createUser(newUser);
}
export {createNewUser};