import express from "express";
import session from "express-session";
import router from "./routes/router.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(express.json());
app.use(router);

export default app;
