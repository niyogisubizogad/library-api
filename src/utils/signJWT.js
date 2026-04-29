
import jwt from "jsonwebtoken";

const signJWT = (user) => {
  const { passwordHash,createdAt } = user;
  
  //=======
  console.log(user);
  console.log(passwordHash);
  console.log(createdAt);
  //=======

  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

  //=============
  console.log(token)
  //===============
  
  return {...user,token};
};

export { signJWT };
