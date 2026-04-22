let books = [
  {
    id: "a1b2c3",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    genre: "Programming",
    totalCopies: 3,
    availableCopies: 2,
    createdAt: "2024-01-15T08:00:00.000Z",
  },
  {
    id: "d4e5f6",
    title: "Refactoring: Improving the Design of Existing Code",
    author: "Martin Fowler",
    isbn: "9780201485677",
    genre: "Software Engineering",
    totalCopies: 4,
    availableCopies: 4,
    createdAt: "2026-04-15T11:01:31.146Z",
  },
];
const users = [
  {
    id: "u7h8i9",
    name: "Alice Uwimana",
    email: "alice@example.com",
    password: "securepassword123",
    role: "member",
    createdAt: "2024-01-16T10:00:00.000Z",
  },
];
const loans = [
  {
    id: "l1m2n3",
    bookId: "a1b2c3",
    userId: "u7h8i9",
    borrowedAt: "2024-01-16T11:00:00.000Z",
    dueDate: "2024-02-16T00:00:00.000Z",
    returnedAt: null,
  },
];

export { books, users, loans };
