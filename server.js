
import express from "express";
import router from "./src/controller/personajeController.js";
import routerP from "./src/controller/peliController.js";
import passport from "passport";
import { jwtStrategy } from "./src/common/jwt.strategy.js"; 
import "dotenv/config"
import routerA from "./src/controller/AuthController.js";
const app = express();
const port = 5000;

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use(express.json());

app.use("/auth", routerA)
app.use("/characters", router);
app.use("/movies", routerP);



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});