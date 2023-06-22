import jwt from "jsonwebtoken";
import 'dotenv/config'

const getRandomString = () => {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 18; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  };
  
 export const getSignedToken = () => {
    const userId = getRandomString();
    const userMail = `${userId}@hotmail.com`;
    const token = jwt.sign(
      {
        payload: "custom payload",
        userEmail: userMail,
      },
      process.env.AUTH_HS256_KEY,
      {
        issuer: process.env.AUTH_ISSUER_URL,
        subject: userId,
        audience: ["http://localhost:5000/"],
        expiresIn: 99999999,
      }
    );
  
    return token;
  };