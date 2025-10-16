import {isValidObjectId} from "mongoose"
import { ApiError } from "../helpers/ApiError"

function checkid(req, res, next){
    if(!isValidObjectId(req.params.id)){
        throw new ApiError(404, `check id invalid object for ${req.params.id}`)
    }
    next()
}

export {checkid}