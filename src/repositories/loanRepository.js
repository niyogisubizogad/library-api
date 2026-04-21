import {loans} from "../store/inMemoryStore.js";


const createLoan = async (newLoan)=>{
   loans.push(newLoan);
   return newLoan;
}

export { createLoan };