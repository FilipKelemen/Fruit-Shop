import { Strategy } from "passport-jwt"
import { ExtractJwt } from "passport-jwt"
import fs from "fs"
import path from "path"
import { User } from "../../api-models/databaseModel"

const pathToKey = path.join(__dirname, "..", "/keys","private_key.pem");
const PRIV_KEY = fs.readFileSync(pathToKey,"utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PRIV_KEY,
  algorithms: ["RS256"]
};

const passportCallback = (passport: any) => {
  // The Strategy is a JWT one
    passport.use(new Strategy(options,async (jwt_payload,done) => {
      // right now the JWT is valid
      try {
        const foundUser = await User.findOne({where: {user_id: jwt_payload.sub}});
          if(foundUser)
            // We found the user and the JWT is valid
            return done(null,foundUser);
          else
            // There is no user
            return done(null, false);
      }
      catch(err){
        // Server error
        done(err,false);
      }
    }));
  }
// app.ts will pass the global passport object here and this function will configure it

export default passportCallback;

