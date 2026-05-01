import swaggerJsdoc from "swagger-jsdoc";

const options = {
  failOnErrors: true,

  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "API documentation for Library system",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    servers: [
      {
        url: "http://localhost:4000",
      },
    ],

    paths: {
      "/api/books": {
        get: {
          summary: "Get all books",
          parameters: [
            {
              in: "query",
              name: "genre",
              schema: {
                type: "string",
              },
              description: "you filter books by genre",
            },
            {
              in: "query",
              name: "available",
              schema: {
                type: "boolean",
              },
              description: "you can filter books by available (true/false)",
            },
          ],
          responses: {
            200: { description: "List of books" },
          },
        },

        post: {
          summary: "Create book",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["title"],
                  properties: {
                    title: { type: "string" },
                    author: { type: "string" },
                    isbn: { type: "string" },
                    genre: { type: "string" },
                    totalCopies: { type: "integer" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "Book created" },
            400: { description: "Validation error" },
          },
        },
      },

      "/api/books/{id}": {
        get: {
          summary: "Get book by id",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Book found" },
            404: { description: "Book not found" },
          },
        },

        put: {
          summary: "Update book",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string" },
                    author: { type: "string" },
                    isbn: { type: "string" },
                    genre: { type: "string" },
                    totalCopies: { type: "integer" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Book updated" },
            404: { description: "Book not found" },
          },
        },

        delete: {
          summary: "Delete book",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Book deleted" },
            404: { description: "Book not found" },
          },
        },
      },

      "/api/users/register": {
        post: {
          summary: "Register user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: "User registered" },
            409: { description: "Email already exists" },
          },
        },
      },

      "/api/users/login": {
        post: {
          summary: "Login user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    email: { type: "string" },
                    password: { type: "string" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Login success" },
            401: { description: "Invalid credentials" },
          },
        },
      },

      "/api/users/{id}": {
        get: {
          summary: "Get user by id",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "User found" },
            404: { description: "User not found" },
          },
        },
      },

      "/api/loans": {
        post: {
          security: [
            {
              bearerAuth: [],
            },
          ],

          summary: "Create loan",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["bookId", "userId", "dueDate"],
                  properties: {
                    bookId: { type: "string" },
                    userId: { type: "string" },
                    dueDate: { type: "string", format: "date" },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: "Loan created" },
            409: { description: "No copies available" },
          },
        },
      },

      "/api/loans/{id}/return": {
        patch: {
          summary: "Return loan",
          security: [
            {
              bearerAuth: [],
            },
          ],

          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "Loan returned" },
            400: { description: "Already returned" },
            404: { description: "Loan not found" },
          },
        },
      },

      "/api/loans/user/{userId}": {
        get: {
          summary: "Get user loans",
          security: [
            {
              bearerAuth: [],
            },
          ],

          parameters: [
            {
              in: "path",
              name: "userId",
              required: true,
              schema: { type: "string" },
            },
          ],
          responses: {
            200: { description: "List of loans" },
            404: { description: "No loans found" },
          },
        },
      },
    },
  },

  apis: [],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
