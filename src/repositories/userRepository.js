import { User } from '../models/index.js';

 const findById = (id) => User.findByPk(id);

 const findByEmail = (email) => User.findOne({ where: { email } });

 const create = (data) => User.create(data);

export {findById, findByEmail, create}