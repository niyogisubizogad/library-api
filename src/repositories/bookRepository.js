import { Book } from '../models/index.js';

 const findAll = () => {
  return Book.findAll();
};

 const findById = (id) => Book.findByPk(id);

const create = (data) => Book.create(data);

 const update = async (id, data) => {
  const book = await Book.findByPk(id);
  if (!book) return null;
  return book.update(data);
};

 const remove = async (id) => {
  const book = await Book.findByPk(id);
  await book.destroy();
  return book;
};
export {findAll,findById,update,remove,create}