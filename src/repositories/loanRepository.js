import { loans } from "../store/inMemoryStore.js";

const createLoan = async (newLoan) => {
  loans.push(newLoan);
  return newLoan;
};
const findById = async (id) => {
  const loan = loans.find((loan) => loan.id === id);
  return loan;
};

const update = async (loan) => {
  const index = loans.findIndex((l) => l.id === loan.id);
  loans[index] = loan;

  return loan[index];
};

export { createLoan, findById, update };
