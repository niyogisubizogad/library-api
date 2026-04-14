import  appError  from '../utils/appError.js';

 const errorHandler = (err, req, res, next)=>{
    console.log(err)
    if(err instanceof appError){
        return res.status(err.statusCode).json({
            status:'error',
            message:err.message
        })
    }
    return res.status(500).json({
        status:'error',
        message:"something went wrong"
    })
    
}
export default errorHandler;