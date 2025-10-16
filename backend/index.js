import { app } from "./app.js";
import { dbContion } from "./src/db/index.js";
import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
})
dbContion()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})