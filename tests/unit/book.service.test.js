import { describe, jest, expect, test, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../src/repositories/bookRepository.js", () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

const repository = await import("../../src/repositories/bookRepository.js");
const service = await import("../../src/services/bookService.js");

describe("Book Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createBook(data)",()=>{
    test(" - calls the repository with the correct data & returns the created book", async () => {
    const payload ={
      title: "DATABASE CONCEPTS",
      author: "N. James",
      isbn: "1236587658769",
      genre: "SOFTWARE DEVELOPMENT",
      totalCopies: 5,
    };

    const newBook = {id:1, ...payload}
    repository.create.mockResolvedValue(newBook);

    const result = await service.createBook(payload);

    expect(repository.create).toHaveBeenCalled();

    const calledData = repository.create.mock.calls[0][0];

    expect(calledData.title).toBe(payload.title);
    expect(calledData.availableCopies).toBe(payload.totalCopies);

    expect(result).toEqual(newBook);
  });
  })
  
 describe("getAllBooks()", ()=>{

  test("- return a list of books from the repository", async () => {
      const mockBooks = [
      {
        id:1,
        title: "DATABASE CONCEPTS",
        author: "N. James",
        isbn: "1236587658769",
        genre: "SOFTWARE DEVELOPMENT",
        totalCopies: 5,
      },
      {
        id:2,
        title: "FRONTEND CONCEPTS",
        author: "N. clement",
        isbn: "1236587668769",
        genre: "SOFTWARE DEVELOPMENT",
        totalCopies: 5,
      },
      {
        id:3,
        title: "BACKEND CONCEPTS",
        author: "N. Gaudance",
        isbn: "1236587758769",
        genre: "SOFTWARE DEVELOPMENT",
        totalCopies: 5,
      },
    ];

    repository.findAll.mockResolvedValue(mockBooks);

    const result = await service.getAllBooks();

    expect(repository.findAll).toHaveBeenCalled();
    expect(Array.isArray(result)).toBe(true);
  });
})

describe("getBookById()",()=>{

  test("- returns a book when exist", async () => {
    const mockBook = {
      id: 3,
      title: "BACKEND CONCEPTS",
      author: "N. Gaudance",
      isbn: "1236587758769",
      genre: "SOFTWARE DEVELOPMENT",
      totalCopies: 5,
    };
    repository.findById.mockResolvedValue(mockBook);

    const result = await service.getBook(mockBook["id"]);

    expect(repository.findById).toHaveBeenCalledWith(3);
    expect(result).toEqual(mockBook);
  });
  
   
  test("- throws or return null when book does not exist", async()=>{
    repository.findById.mockResolvedValue(null);

    await expect(service.getBook(2)).rejects.toThrow("Book Not Found")

  })
  })


  
describe("updateBook(id, data)",()=>{
    test("Updating book by it's id ",async()=>{
    const mockBook = {
        id:1,
        title: "DATABASE CONCEPTS",
        author: "N. James",
        isbn: "1236587658769",
        genre: "SOFTWARE DEVELOPMENT",
        totalCopies: 5,
        availableCopies:3
      }
       const payload ={
        title: "Backend concepts",
        author: "KWIZERA Bosco",
        
      }
      repository.findById.mockResolvedValue(mockBook);
      repository.update.mockResolvedValue({...mockBook, ...payload});

      const result = await service.updateBook(mockBook.id, payload);
      const updatedData = repository.update.mock.calls[0][1];
  
  
      expect(updatedData.author).toBe(payload.author);
      expect(repository.update).toHaveBeenCalled();
      expect(result).toEqual(updatedData);

        
        
   
  });
})
describe("deleteBook(id)", ()=>{
    test("alls the repository delete with correct id", async ()=>{
     const mockBook = {
        id:1,
        title: "DATABASE CONCEPTS",
        author: "N. James",
        isbn: "1236587658769",
        genre: "SOFTWARE DEVELOPMENT",
        totalCopies: 5,
        availableCopies:3
      }
    repository.remove.mockResolvedValue(mockBook);

    const result = await service.deleteBookById(mockBook.id);

    expect(repository.remove).toHaveBeenCalledWith(mockBook.id);
    expect(result).toEqual(mockBook)

  })

});

})