import * as userService from "../services/userService.js";

const createUser = async (req, res, next) => {
  try {
    const { id, name, email, role, createdAt } =
      await userService.createNewUser(req.body);

    return res.status(201).json({
      success: true,
      data: {
        id,
        name,
        email,
        role,
        createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { id, name, email, role } = await userService.login(req.body);
    return res.status(200).json({
      success: true,
      data: {
        id,
        name,
        email,
        role,
      },
    });
  } catch (err) {
    next(err);
  }
};
const getUserById = async (req, res, next) => {
  try{
  const { id } = req.params;
  const user = await userService.findUserById(id);
  if(!user){
    return res.status(404).json({
      success:false,
      message:"User not found"
    })
  }
  const { name,email, role, createdAt } = user;

  return res.status(200).json({
    success: true,
    data: {
      id,
      name,
      email,
      role,
      createdAt,
    },
  });
}catch(err){
  next(err)
}
}
export { createUser, loginUser,getUserById };
