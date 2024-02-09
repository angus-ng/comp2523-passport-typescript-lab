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
  try{
    let user = userModel.findById(id);
    if (user) {
      return user;
    }
} catch (err) {
    return null;
  }
};
const findOrCreate = (githubId: number, githubName: string, githubEmail:string) => {
  try {
    const user = userModel.findByGithubId(githubId);
    if (user){
      return user;
    } 
  } catch (err) {
    if (githubName === null){
      githubName = "";
    }
    if (githubEmail === null){
      githubEmail = "";
    }
      return userModel.createUser(githubName, githubEmail, undefined, githubId);
  }
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate
};
