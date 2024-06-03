import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: {
        id: "",
        name: "",
        password: "",
        email: "",
        phone: ""
    },
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getAll: () => { }
    }
});

export const { getAll } = userSlice.actions;
export default userSlice.reducer;