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

export { createLoan };
