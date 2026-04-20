import { users } from "../store/inMemoryStore.js";

const createUser = async (user) =>{
     await users.push(user);
    return user;
}
export {createUser}