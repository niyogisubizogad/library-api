import { createNewUser } from "../services/userService.js";

const createUser = async (req, res, next) => {
  try {
    const user = await createNewUser(req.body);

    return res.status(201).json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};
export { createUser };
