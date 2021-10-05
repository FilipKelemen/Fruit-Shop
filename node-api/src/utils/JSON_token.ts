import jsonwebtoken from "jsonwebtoken";
import fs from "fs"
import path from "path"

const pathToKey = path.join(__dirname, "..","/keys","private_key.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

const issueJWT = (user: any) => { // the user is in fact the model that comes back from the database
  const user_id: string = user.user_id;

  const expiresIn:string = "14d"; // It has to be in this format ="3d","172d" etc otherwise the way front end handles it breaks the app

  const payload = {
    sub: user_id,
    iat: Date.now()
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn,
    algorithm: "RS256"
  });

  return {
    token: "Bearer "+ signedToken,
    expires: expiresIn
  }
}

export {issueJWT};
