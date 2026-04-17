import Joi from "joi";

const createBookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  isbn: Joi.number().min(10).required(),
  genre: Joi.string().required(),
  totalCopies: Joi.number().integer().min(1).required(),
});

export default createBookSchema;
