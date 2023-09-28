import passport from "passport";
import { userModel } from "../db/models/users.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GitHubStrategy } from "passport-github2";
import { usersManager } from "../db/usersManager.js";
import { compareData } from "../utils.js";

passport.use("local", new LocalStrategy(
  async function(username, password, done) {
    try {
      const userDB = await usersManager.findUser(username);
      if (!userDB) {
        return done(null, false, { message: "user not found" });
      } 
      const isPasswordValid = await compareData(password, userDB.password);
      if (!isPasswordValid) {
        return done(null, false, { message: "invalid password" });
      }
      return done(null, userDB);
    } catch (error) {
      done(error, null);
    }
  }
));

passport.use(new GitHubStrategy(
  {
    clientID: "Iv1.b328cd41ca04d66e",
    clientSecret: "b47576cf274d8322fc2ddcf1ede545262b77c4c6",
    callbackURL: "http://localhost:8080/api/users/github"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const userDB = await usersManager.findUser(profile.username);
      if (!userDB) {
        return done(null, false);
      }
      const newUser = { 
        first_name: profile.displayName.split(' ')[0],
        last_name: profile.displayName.split(' ')[1], 
        password: '',
      };
     
      const result = await usersManager.create(newUser);
      return done(null, result);
    } catch (error) {
      done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async(id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
