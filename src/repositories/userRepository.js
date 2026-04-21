import { users } from "../store/inMemoryStore.js";

const createUser = async (user) =>{
     await users.push(user);
    return user;
}
const findUser = async (email) =>{
const user = users.find(user => user.email === email);
   return user;
}
const findById = async(id)=>{
   const user = users.find(user => user.id === id);
   return user;
}
export {createUser,findUser,findById}