import express from "express"
import notesRouter from "./routers/notesRouter.js";
import dotenv from "dotenv";
import {connectDB} from "./config/DBconnection.js";
import cors from "cors";
import rateLimiter from "./middlewares/ratelimiter.js"

dotenv.config();

const PORT = 3001;
const app = express();

app.use(cors());
app.use(express.json())
app.use("/api/notes", notesRouter);
app.use(rateLimiter);


connectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is runnning on ${PORT}`)
    });
});

