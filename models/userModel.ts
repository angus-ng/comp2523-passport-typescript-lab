import { RoleTypes } from "../middleware/passportStrategies/localStrategy";

const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin" as RoleTypes
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user" as RoleTypes
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    githubId: 3,
    role: "user" as RoleTypes
  },
];

const userModel = {

  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with email: ${email}`);
  },
  
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with id: ${id}`);
  },

  findByGithubId: (id: number) => {
    const user = database.find((user) => user.githubId === id);
    if (user) {
      return user;
    }
    throw new Error(`Couldn't find user with githubId: ${id}`);
  },

  createUser: (name: string, email: string, password?: string, githubId?: number) => {
    let newUser;
    if (githubId) { 
      try {
        userModel.findById(githubId) //see if id and githubId overlap
        newUser = { //if overlap
          id: userModel.generateId(),
          name: name,
          email: email,
          githubId: githubId,
          role: "user" as RoleTypes
        }
      } catch (err){//otherwise
        newUser = { 
          id: githubId,
          name: name,
          email: email,
          githubId: githubId,
          role: "user" as RoleTypes
        }
      }
    } else if (password) {
      newUser = {
        id: userModel.generateId(),
        name: name,
        email: email,
        password: password,
        role: "user" as RoleTypes
      }
    } else {
      throw new Error("missing password or githubId")
    }
    database.push(newUser)
    return newUser;
  },

  generateId: () => {
    let newId:number
    do {
    newId = Number(Math.random().toString().slice(2));
    } while (database.find((user) => user.id === newId))
    return newId;
  }
};


export { database, userModel };
