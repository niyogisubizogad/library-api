import * as service from "../services/bookService.js";
import appError from "../utils/appError.js";

const createBook = async (req, res, next) => {
  try {
    const book = await service.createBook(req.body);
    return res.status(201).json({
      success: true,
      data: book,
    });
  } catch (err) {
 if(err instanceof appError){
    return res.status(err.statusCode).json({
      success:false,
      message:err.message
    })
  }  }
};

const getBooks = async (req, res, next) => {
  try {
    const books = await service.getAllBooks(req.query);
    return res.status(200).json({
      success: true,
      data: books,
    });
  } catch (err) {
 if(err instanceof appError){
    return res.status(err.statusCode).json({
      success:false,
      message:err.message
    })
  }  }
};

const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.updateBook(id, req.body);
   
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const deleteBook = async (req,res,next)=>{
  try{
  const {id} = req.params;
  const deletedBook = await service.deleteBookById(id);

  return res.status(200).json({
    success:true,
    data:`Book with id: ${id} is deleted in our records`

  });
 
}
catch(err){
  if(err instanceof appError){
    return res.status(err.statusCode).json({
      success:false,
      message:err.message
    })
  }
}
};
const getBookById = async(req,res,next)=>{
  try{
  const id = req.params?.id;
   if (!id) {
    return res.status(400).json({
      success: false,
      message: "ID is required",
    });
  }
  const result = await service.getBook(id);
  if(!result.success){
    return res.status(404).json(result)
  }
  res.status(200).json(result);}
  catch(err){
     if(err instanceof appError){
    return res.status(err.statusCode).json({
      success:false,
      message:err.message
    })
  }
  }

}
export { getBooks, createBook, updateBook,deleteBook,getBookById };
