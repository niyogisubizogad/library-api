import * as service from "../services/bookService.js";

const createBook = async (req, res, next) => {
  try {
    const book = await service.createBook(req.body);
    return res.status(201).json({
      success: true,
      data: book,
    });
  } catch (err) {
    next(err);
  }
};

const getBooks = async (req, res, next) => {
  try {
    const books = await service.getAllBooks(req.query);
    return res.status(200).json({
      success: true,
      data: books,
    });
  } catch (err) {
    next(err);
  }
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

  res.status(200).json({
    success:true,
    data:deletedBook,

  });
  if(!deletedBook){
    res.status(404).json({
      success:false,
      message:"Book Not Found"
    })
  }
}
catch(err){
  next(err)
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
    next(err);
  }

}
export { getBooks, createBook, updateBook,deleteBook,getBookById };
