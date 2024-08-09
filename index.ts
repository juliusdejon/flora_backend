import "dotenv/config";
import express, { Express, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import users from "./routes/api/users";
import payments from "./routes/api/payments";


// Database Configuration
mongoose.connect(`${process.env.MONGODB_URI}`);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error connecting to database: "));
db.once("open", () => {
  console.log("Mongo DB connected successfully.");
});

const HTTP_PORT = process.env.PORT || 8080;
const app: Express = express();


/*
  middlewares
*/
function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token === null || token === undefined) return res.sendStatus(401);

  jwt.verify(`${token}`, `${process.env.ACCESS_TOKEN_SECRET}`, (err, user) => {
    if(err) return res.sendStatus(403)
    // @ts-ignore
    req.user = user;
    next();
  })
}

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/assets'));


/*
  route endpoints
*/

app.use("/api/users", authenticate, users);
app.use('/api/payment', payments);

/* server listening*/
const onHttpStart = () => {
  console.log(`The web server has started at http://localhost:${HTTP_PORT}`);
  console.log("Press CTRL+C to stop the server.");
};

app.listen(HTTP_PORT, onHttpStart);
