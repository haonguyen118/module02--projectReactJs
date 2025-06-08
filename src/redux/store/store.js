
import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "../reducers/combineSlice";


const store = configureStore({
    reducer: rootReducers,
});
export default store;
