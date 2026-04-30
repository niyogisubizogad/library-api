import { Book } from '../models/index.js';

export const findAll = () => {
  return Book.findAll();
};

export const findById = (id) => Book.findByPk(id);

export const create = (data) => Book.create(data);

export const update = async (id, data) => {
  const book = await Book.findByPk(id);
  if (!book) return null;
  return book.update(data);
};

export const remove = async (id) => {
  const book = await Book.findByPk(id);
  await book.destroy();
  return book;
};