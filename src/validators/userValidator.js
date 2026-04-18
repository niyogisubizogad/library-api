import Joi from "joi"
const createUserSchema = Joi.object({
    name:Joi.string().required(),
    role:Joi.string().required(),
    password:Joi.string().required(),
    email:Joi.string().email().required()


});
export default createUserSchema;