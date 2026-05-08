import { Loan, Book } from '../models/index.js';

 const create = (data) => Loan.create(data);

 const findById = (id) => Loan.findByPk(id);

 const update = async (id, data) => {
  const loan = await Loan.findByPk(id);
  if (!loan) return null;
 return loan.update(data);
};

 const findByUser = (userId) =>
  Loan.findAll({
    where: { userId },
    include: [
      {
        model: Book,
        attributes: ['id', 'title', 'author'],
      },
    ],
  });
  export {create, findById, update, findByUser}