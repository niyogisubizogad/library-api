import { Loan, Book } from '../models/index.js';

export const create = (data) => Loan.create(data);

export const findById = (id) => Loan.findByPk(id);

export const update = async (id, data) => {
  const loan = await Loan.findByPk(id);
  if (!loan) return null;
  return loan.update(data);
};

export const findByUser = (userId) =>
  Loan.findAll({
    where: { userId },
    include: [
      {
        model: Book,
        attributes: ['id', 'title', 'author'],
      },
    ],
  });