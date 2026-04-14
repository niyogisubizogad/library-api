import Joi from "joi";
import appError from "../utils/appError.js";

 const validateBody = (schema)=>{
    return (req,res,next)=>{
 const {error,value}= schema.validate(req.body ,{
        abortEarly: false,
        stripUnknown: true
  });

        if(error){
            const message = error.details.map(e => e.message).join(',');
            return next(new appError(message, 400));
        }
        req.body = value;
        next();
    }
}
export default validateBody;
