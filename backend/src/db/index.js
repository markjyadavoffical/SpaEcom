import mongoose from "mongoose";


const dbContion = async () => {
    try {
        const response = await mongoose.connect(`${process.env.DB_URI}`)
        console.log("mongodb contion was sussfully ", response.connection.host)
        return response;
    
    } catch (error) {
        console.log("mongodb error ", error)
        process.exit()
    }
}


export {dbContion}