import * as loanService from "../services/loanService.js";
import appError from "../utils/appError.js";

const createLoans = async (req, res, next) => {
  try {
    const loan = await loanService.createLoan(req.body);
   
    return res.status(201).json({
      success: true,
      data: loan,
    });

  } catch (err) {
  if(err instanceof appError){
   return res.status(err.statusCode).json({
    success:false,
    message:err.message
   })
  }}
};
const returnBook = async (req,res,next)=>{
    try{
    const {id} = req.params;
    const loan = await loanService.returnBook(id);

    return res.status(200).json({
        success:true,
        data:loan
    })
}catch(err){
   if(err instanceof appError){
   return res.status(err.statusCode).json({
    success:false,
    message:err.message
   })
  }}
}
export{createLoans, returnBook} ;
