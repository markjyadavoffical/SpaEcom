import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"

const app = express()
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}))
app.use(express.urlencoded({extended:true}))
app.use(express.json({limit:"16kb"}))
app.use(cookieParser())



//router define
import userRotuer from "./src/routes/uload.routes.js";
import productRouter from "./src/routes/product.routes.js";
import orderRouter from "./src/routes/order.routes.js";
import categoryRouter from "./src/routes/category.routes.js";
import uplaodRouter from "./src/routes/uload.routes.js";



app.use("/api/user",userRotuer);
app.use("/api/product",productRouter);
app.use("/api/order", orderRouter);
app.use("/api/category",categoryRouter);
app.use("api/uplaod", uplaodRouter);


const __dirname = path.resolve()
app.use("/upolads", express.static(path.join(__dirname + "/upolads")))

export {app}

