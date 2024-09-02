import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import todoroutes from './routes/todo.routes.js'
import userrouter from './routes/user.routes.js'

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1/todos", todoroutes);
app.use("/api/v1/users", userrouter);

app.get("/",
    (req, res) => {
        res.send({
            message: "Welcome to the Alumni API",   
        })
    }
)

export default app 