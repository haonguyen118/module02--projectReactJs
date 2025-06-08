
import { combineReducers } from "@reduxjs/toolkit";
import userSlice from "./slice/userSlice" 
const rootReducers = combineReducers({
    users: userSlice,
});
export default rootReducers;
