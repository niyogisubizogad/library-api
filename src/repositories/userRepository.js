import { User } from '../models/index.js';

export const findById = (id) => User.findByPk(id);

export const findByEmail = (email) => User.findOne({ where: { email } });

export const create = (data) => User.create(data);