import { findById } from "../repositories/bookRepository.js";
import { allowedFields } from "../utils/book.js";

const bodyNotEmpty = async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      success: false,
      message: "request body must contain atleast one field to update",
    });
  }
  next();
};

const bookExists = async (req, res, next) => {
  const { id } = req.params;
  const book = await findById(id);
  if (!book) {
    return res.status(404).json({ success: false, message: "Book Not Found" });
  }

  next();
};

const checkAllowedFields = (req, res, next) => {
  const availableCopies = req.body.availableCopies;
  if (availableCopies) {
    return res.status(400).json({
      success: false,
      message: "You are not allowed to edit number of available copies",
    });
  }
  const requestKeys = Object.keys(req.body);
  const invalidField = requestKeys.filter(field => !allowedFields.includes(field));
  if(invalidField.length > 0){
     return res.status(400).json({
      success: false,
      message: ` '${invalidField}' field is not allowed`
    });
  }
  next();
};

export default [ bodyNotEmpty, bookExists, checkAllowedFields ];
