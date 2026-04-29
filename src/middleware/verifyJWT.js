import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try{
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(403).json({
      success: false,
      message:
        "You are not authorized yet to access this endpoint please Login to continue",
    });
  }
  const token = authorization
    .split(" ")
    .filter((t) => t.length > 6)
    .toString();


  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(403).json({
      success: false,
      message: "Require valid token to pass",
    });
  }
  req.user = decodedToken
  next();

}catch(err){
  
  return res.status(400).json({
    success:false,
    message:"please try again later"
  })
  
}
}
export { verifyJWT };
