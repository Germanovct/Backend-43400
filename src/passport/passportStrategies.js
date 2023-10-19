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
        return done(null, false, { message: "Usuario no encontrado" });
      } 
      const isPasswordValid = await compareData(password, userDB.password);
      if (!isPasswordValid) {
        return done(null, false, { message: "Contraseña inválida" });
      }
      return done(null, userDB);
    } catch (error) {
      return done(error, null);
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
       
        const newUser = await usersManager.createUser({
          username: profile.username,
          password: 'password_predeterminada', 
          first_name: 'NombrePredeterminado', 
          last_name: 'ApellidoPredeterminado', 
        });

        

        return done(null, newUser);
      } else {
        
        return done(null, userDB);
      }
    } catch (error) {
      return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
