import express from "express"
import notesRouter from "./routers/notesRouter.js";
import dotenv from "dotenv";
import {connectDB} from "./config/DBconnection.js";
import cors from "cors";
import rateLimiter from "./middlewares/ratelimiter.js"
import path from 'path';

const __dirname = path.resolve();

dotenv.config();

const PORT = 3001;
const app = express();

if (process.env.NODE_ENV !== "production"){
    app.use(cors());
}

app.use(express.json())
app.use("/api/notes", notesRouter);
app.use(rateLimiter);

console.log("__dirname:", __dirname);
console.log("Resolved path:", path.join(__dirname, "../Frontend/dist"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../Frontend/dist")));

    app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
    });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});

