import jwt from "jsonwebtoken";

const signJWT = (user) => {
  const { passwordHash, createdAt, ...remainingUserFields } = user.dataValues;

  const token = jwt.sign(remainingUserFields, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const userDataWithToken = { ...remainingUserFields, token };
  return userDataWithToken;
};

export { signJWT };
