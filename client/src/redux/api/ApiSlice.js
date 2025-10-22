import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query"
import {BAS_URL}  from "../constant.js"

const baseQuery = fetchBaseQuery({baseUrl:BAS_URL})

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Product", "Order", "User", "Category"],
    endpoints: () => ({}),
})

