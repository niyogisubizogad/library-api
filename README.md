## Project overview
library management projet
In this project user can borrow a book and and then system decrement number of book available.
System provide access to authorized user


## Installation guide
- You must node installed in your computer.
if it wasn't installed yet. [download node.js](https://nodejs.org/en/download)
- Clone this repository [library-api](https://github.com/niyogisubizogad/library-api.git)
- Go in your terminal then do the following:

```
- cd library-api
- npm install
- npm run dev 
```
- Open postman then visit this [endpoint](https://localhost:4000/api/books)
## Database setup

1. Install Postgres.app from https://postgresapp.com and start it
2. Create the database:
   psql -U postgres -c "CREATE DATABASE library_dev;"
3. Run migrations to create the tables:
   npx sequelize-cli db:migrate
4. Add sample books:
   npx sequelize-cli db:seed:all

## Environment variables

| Variable | Description |
|----------|-------------|
| PORT | Port the server runs on (default 3000) |
| DB_HOST | Database host (localhost for local development) |
| DB_PORT | Database port (5432 for PostgreSQL) |
| DB_NAME | Database name (library_dev) |
| DB_USER | PostgreSQL username |
| DB_PASSWORD | PostgreSQL password (empty on Mac by default) |

