import { User } from '../models/index.js';

export const findById = (id) => User.findByPk(id);

export const findByEmail = (email) => User.scope(null).findOne({ where: { email } });

export const create = (data) => User.create(data);