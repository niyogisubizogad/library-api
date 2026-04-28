import { Book } from '../models/index.js';

export const findAll = ({ genre, available } = {}) => {
  const where = {};
  if (genre) where.genre = genre;
  if (available === 'true') where.availableCopies = { [Symbol.for('gt')]: 0 };
  return Book.findAll({ where });
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
  if (!book) return false;
  await book.destroy();
  return true;
};