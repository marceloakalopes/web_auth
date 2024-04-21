import passport from "passport";
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User")(sequelize, DataTypes);
import bcrypt from "bcrypt";

interface customFields {
  usernameField: string;
  passwordField: string;
}

passport.use(
  new LocalStrategy(
    ({ usernameField, passwordField }: customFields, done: any) => {
      User.findOne({ where: { Username: usernameField } }).then(
        async (user: any) => {
          if (user) {

            const { UserId, Username, Password } = user.dataValues;

            const match = await bcrypt.compare(passwordField, Password);

            if (!match) {
              return done(null, false, { message: "Incorrect password" });
            } else if (match) {
              return done(null, { UserId, Username });
            }
          } else {
            return done(null, false, { message: "User not found" });
          }
        }
      )
      .catch((error: any) => {
        return done(error);
      });
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user.UserId);
});

passport.deserializeUser((UserId: number, done: any) => {
  User.findByPk(UserId).then((user: any) => {
    done(null, user);
  });
});