import * as userService from "../services/userService.js";

const createUser = async (req, res, next) => {
  try {
    const {id,name,email,role,createdAt} = await userService.createNewUser(req.body);

    return res.status(201).json({
      success: true,
      data: {
        id,
        name,
        email,
        role,
        createdAt
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
export { createUser, loginUser };
