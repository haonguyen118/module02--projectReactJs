import { createSlice } from "@reduxjs/toolkit";
import { userFindAll } from "../../api/service/userService";


const initialState = {
    isLoading: false,
    users: [],
    error: null,
    
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userFindAll.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(userFindAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(userFindAll.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error;
            });
    },

});
export default userSlice.reducer;