import { createAsyncThunk } from "@reduxjs/toolkit";
import {jsonAxios} from "./index"


export const userFindAll = createAsyncThunk('users/userFindAll', async () => {
    const resp = await jsonAxios.get('users');
    // console.log("resp",resp);
    
    return resp.data;
});
export const userAdd = async (newUser) => {
    const resp = await jsonAxios.post('users', newUser);
    return resp;
};
export const deleteUser = async (oldStatus,userId) => {
    const resp = await jsonAxios.patch(`users/${userId}`, { status: oldStatus });
    return resp;
};
export const userUpdate = async (updateUser, updateId) => {
    const resp = await jsonAxios.patch(`users/${updateId}`, updateUser);
    return resp;
};
