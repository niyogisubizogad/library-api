import * as loanRepository from "../repositories/loanRepository.js";
import * as bookRepository from "../repositories/bookRepository.js";
import * as userRepository from "../repositories/userRepository.js";
import appError from "../utils/appError.js";
import { v4 as uuidv4 } from "uuid";

const createLoan = async ({ bookId, userId, dueDate }) => {

  const user = await userRepository.findById(userId);
  const book = await bookRepository.findById(bookId);
  if (!user) {
    throw new appError("User not found", 404);
  }
  if (!book) {
    throw new appError("Book not found", 404);
  }
  if (book.availableCopies === 0) {
    throw new appError("No copies of this book are currently available", 409);
  }

  const newLoan = {
    id: uuidv4(),
    bookId,
    userId,
    borrowedAt: new Date().toISOString(),
    dueDate,
    returnedAt: null,
  };

  await book.update({
    availableCopies: book.availableCopies - 1
  });

  return await loanRepository.create(newLoan);
};


const returnBook = async (id) => {
  const loan = await loanRepository.findById(id);
  if (!loan) {
    throw new appError("Loan not found", 404);
  }
  const book = await bookRepository.findById(loan.bookId);

  if (loan.returnedAt !== null) {
    throw new appError("This loan has already been returned", 409);
  }
 
await book.update({
  availableCopies: book.availableCopies +1
});

 await loan.update({
  returnedAt: new Date().toISOString(),
 })
 return loan;
};
const getLoanByUser = async (id) => {

  const loans = await loanRepository.findByUser(id);

  const userLoans = await Promise.all(
    loans.map(async (loan) => {
      const book = await bookRepository.findById(loan.dataValues.bookId);
      
      const userLoan = {
        id: loan.id,
        borrowedAt: loan.borrowedAt,
        dueDate: loan.dueDate,
        returnedAt: loan.returnedAt,
        book: {
          id: book.id,
          title: book.title,
          author: book.author,
        },
      };
      return userLoan;
    }),
  );
  return userLoans;
};
export { createLoan, returnBook, getLoanByUser };
