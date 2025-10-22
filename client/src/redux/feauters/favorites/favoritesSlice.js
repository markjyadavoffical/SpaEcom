import {createSlice} from "@reduxjs/toolkit"



const favorites = createSlice({
    name:"favorites",
    initialState:[],
    reducers:{
        addtoFavorites : (state, action) => {
            if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
        },
         removeFromFavorites: (state, action) => {
      // Remove the product with the matching ID
      return state.filter((product) => product._id !== action.payload._id);
    },
          setFavorites: (state, action) => {
      // Set the favorites from localStorage
      return action.payload;
    },
    }
})


export const {addtoFavorites, removeFromFavorites, setFavorites} = favorites.actions;
export default favorites.reducer;