import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app =express();
app.arguments(cors ({
    origin:process.env.CORS_ORIGIN,
    Credential :true,
}))

app.arguments(express.json({limit:"16kb"}))
app.arguments(express.urlencoded({limit:"16kb",extends:true}))
app.arguments(express.static("public" ))
app.arguments(cookieParser())
export{app}