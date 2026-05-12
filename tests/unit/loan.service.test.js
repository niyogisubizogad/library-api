import { describe, jest, expect, test, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../src/repositories/loanRepository.js", () => ({
  create: jest.fn(),
  findById: jest.fn(),
  update: jest.fn(),
  findByUser: jest.fn(),
}));
jest.unstable_mockModule("../../src/repositories/bookRepository.js", () => ({
  findById: jest.fn(),
}));
jest.unstable_mockModule("../../src/repositories/userRepository.js", () => ({
  findById: jest.fn(),
}));

const bookRepository = await import("../../src/repositories/bookRepository.js");
const userRepository = await import("../../src/repositories/userRepository.js");
const loanService = await import("../../src/services/loanService.js");
const loanRepository = await import("../../src/repositories/loanRepository.js");

describe("Loan Services", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("create(data)", () => {
    test("create loans record via repository", async () => {
      const mockBook = {
        id: 1,
        title: "DATABASE CONCEPTS",
        author: "N. James",
        isbn: "1236587658769",
        genre: "SOFTWARE DEVELOPMENT",
        totalCopies: 5,
        availableCopies: 6,
        update: jest.fn().mockResolvedValue(true), 


      };
      const mockUser = {
        id: 1,
        name: "Justin",
        email: "intentions@jb.com",
        password: "beiber@123",
        role: "member",
      };

      const payload ={ bookId: 1, userId: 2, dueDate: new Date("2026-12-31") };
      const data = {
        id: 1,
        ...input,
        borrowedAt: new Date().toISOString(),
        returnedAt: null,
      };
      bookRepository.findById.mockResolvedValue(mockBook);
      userRepository.findById.mockResolvedValue(mockUser)
      loanRepository.create.mockResolvedValue(data);

      const result = await loanService.createLoan(input);
      expect(loanRepository.create).toHaveBeenCalled();
      expect(result).toEqual(data);
    });
  });
  describe("returnBook(loanId)",()=>{
    test("- calls repository update with a return date", async()=>{
      const mockBook = {
        id: 1,
        title: "DATABASE CONCEPTS",
        author: "N. James",
        isbn: "1236587658769",
        genre: "SOFTWARE DEVELOPMENT",
        totalCopies: 7,
        availableCopies: 6,


      };
    
        const mockLoan = {
          id: 3,
          userId: 2,
          bookId: 1,
          dueDate: "2026-12-31T00:00:00.000Z",
          borrowedAt: "2026-05-06T15:39:03.407Z",
          returnedAt: null,
        };
      const returnedDate = new Date().toISOString();
      
      bookRepository.findById.mockResolvedValue(mockBook)
      loanRepository.findById.mockResolvedValue(mockLoan);
      loanRepository.update.mockResolvedValue({...mockLoan, returnedAt:returnedDate})
      const result = await loanService.returnBook(mockLoan.id);
      expect(result.returnedAt).not.toBe(null);
    })
  })
  describe("getLoanByUser()",()=>{
 
    test(" - returns the list of loans for a given user",async()=>{
        const mockLoan = [
          {
            dataValues: {
              id: 3,
              userId: 2,
              bookId: 1,
              dueDate: "2026-12-31T00:00:00.000Z",
              borrowedAt: "2026-05-06T15:39:03.407Z",
              returnedAt: null,
            },
            dataValues: {
              id: 4,
              userId: 2,
              bookId: 1,
              dueDate: "2026-12-31T00:00:00.000Z",
              borrowedAt: "2026-05-06T15:39:03.407Z",
              returnedAt: null,
            },
          },
        ];
        const mockBook = {
          id: 1,
          title: "DATABASE CONCEPTS",
          author: "N. James",
          isbn: "1236587658769",
          genre: "SOFTWARE DEVELOPMENT",
          totalCopies: 7,
          availableCopies: 6,
        };
        loanRepository.findByUser.mockResolvedValue(mockLoan);
        bookRepository.findById.mockResolvedValue(mockBook);

        const result = await loanService.getLoanByUser(2);

        expect(Array.isArray(result)).toBe(true)
      })
  })
});
