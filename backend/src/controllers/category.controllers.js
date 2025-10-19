import { ApiError } from "../helpers/ApiError";
import { ApiResponse } from "../helpers/ApiResponse";
import { asyncHandler } from "../helpers/asyncHandler.js";
import { Category } from "../models/category.model.js";

const createCategory = asyncHandler(async(req, res) => {
   try {
     const {name}  =  req.body
     if(!name){
         throw new ApiError(400, "name is required")
     }
     const existCategroy = await Category.findOne({name})
     if(existCategroy){
         throw new ApiError(400, "categroy alearday exists")
     }
 
     const category = await new Category({name}).save()
     res.status(200).json(
        new ApiResponse(201, "category was sussfully create")
     )
   } catch (error) {
     console.log(error)
     throw new ApiError(`category error ${error.message} `)
   }
    
})


const upadateCategory = asyncHandler(async(req,res) => {
    try {
        const {name} = req.body;
        const {categoryId} = req.params;
    
        const category = await Category.findOne({_id:categoryId})
    
        if(!category){
            throw new ApiError(500, "category not found")
        }
        category.name  = name;
        const upadateCategory = await category.save()
        res.status(200).json(
            new ApiResponse(201, upadateCategory, "updateCategory sussfully")
        )
    } catch (error) {
        console.log(error)
        throw new ApiError(`upadtecategory error : ${error.message}`)
    }
})

const removedCategory = asyncHandler(async(req, res) => {
    try {
        const removed  = await Category.findByIdAndDelete(req.params.categoryId)
        res.status(200).json(
            new ApiResponse(201, removed, "removedCategory sussfully")
        )
    } catch (error) {
        console.log(error)
        throw new ApiError(500, "interanl server error")
    }
})


const  listCategory = asyncHandler(async(req, res) => {
    try {
        const all = await Category.find({})
        res.status(200).json(
            new ApiResponse(201, all, "all listcategory was sussfully")
        )
        
    } catch (error) {
        console.log(error)
        throw new ApiError(400, `error listcategory : ${error.message}`)
    }
})

const readCategory = asyncHandler(async(req, res) => {
    try {
        const category = await Category.findOne({_id:req.params._id})
        res.status(200).json(
         new ApiResponse(201, category, "read category was sussfully")
        )
    } catch (error) {
        console.log(error)
        throw new ApiError(`error readCategory :${error.message}`)
    }
})


export {
    createCategory,
    upadateCategory,
    removedCategory,
    listCategory,
    readCategory
}


