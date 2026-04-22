import {loans} from "../store/inMemoryStore.js";


const createLoan = async (newLoan)=>{
   loans.push(newLoan);
   return newLoan;
}

const findById = (id)=>{
  const loan = loans.find(loan =>loan.id === id);
  return loan;
}

const findUserLoan = (userId,userLoan)=>{
  const loan = loans.filter(loan =>loan.userId === userId);
  return loan;
}

export { createLoan,findById, findUserLoan };