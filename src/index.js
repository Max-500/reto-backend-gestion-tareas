import express from "express";
import dotenv from "dotenv";
import taskRoutes from "./v1/routes/taskRoutes.js";
import commentRoutes from "./v1/routes/commentRoutes.js"
import limiter from "./configurations/rateLimiter.js"
import "./database/asociations.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(limiter)

app.use("/api/v1", taskRoutes);
app.use("/api/v1", commentRoutes);

const port = process.env.PORT || 3000;

app.listen(port, (error) => {
    if(error){
        console.log(`Error starting the server: ${error}`)
    }else{
        console.log(`Server listening on http://127.0.0.1:${port}`)
    }
})