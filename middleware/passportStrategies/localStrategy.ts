import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      email: string;
      password?: string;
      githubId?: number;
    }
  }
}

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email, password, done) => {
    const userOrError = getUserByEmailIdAndPassword(email, password);
    return (typeof userOrError !== "string")
      ? done(null, userOrError)
      : done(null, false, {
          message: userOrError,
        });
  }
);

passport.serializeUser(function (user:Express.User, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id: number, done) {
  let user = getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
