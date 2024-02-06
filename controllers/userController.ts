import {userModel} from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  try {
  let user = userModel.findOne(email);
    if (isUserValid(user, password)) {
      return user;
    }
    return "Incorrect Password"
  } catch (err) {
    return `User with email: ${email} cannot be found`
  }
};
const getUserById = (id:any) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
};
