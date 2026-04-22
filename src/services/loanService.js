import * as loanRepository from "../repositories/loanRepository.js";
import * as bookRepository from "../repositories/bookRepository.js";
import * as userRepository from "../repositories/userRepository.js";
import appError from "../utils/appError.js";

import { v4 as uuidv4 } from "uuid";

const createLoan = async (loan) => {
  const { bookId, userId, dueDate } = loan;

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

  book.availableCopies--;
  bookRepository.update(book);

  return await loanRepository.createLoan(newLoan);
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
  loan.returnedAt = new Date().toISOString();
  //TODO:Update book

  // TODO:Update loan then return it

  // TODO: console log all loans to see if the 
  return updatedLoan;
};

// TODO: remove this method for now
const getLoanByUser = async (id) => {
  const user = await userRepository.findById(id);
  if (!user) {
    throw new appError("User not found", 404);
  }

  const loan = await loanRepository.findUserLoanById(id);
  if (!loan) {
    return [];
  }

  const book = await bookRepository.findById(loan.bookId);

  if (user.id === loan.userId) {
    const userLoan = [
      {
        id: loan.id,
        borrowedAt: loan.borrowedAt,
        dueDate: loan.dueDate,
        returnedAt: loan.returnedAt,
        book: {
          id: book.id,
          title: book.title,
          author: book.author,
        },
      },
    ];

    return userLoan;
  }
};

export { createLoan, returnBook, getLoanByUser };
