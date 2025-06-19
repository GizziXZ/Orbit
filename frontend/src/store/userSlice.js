import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        id: null,
        username: null,
        profilePicture: null,
        settings: null
    },
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.profilePicture = action.payload.profilePicture;
            state.settings = action.payload.settings;
        },
        clearUser: (state) => {
            state.id = null;
            state.username = null;
            state.profilePicture = null;
            state.settings = null;
        },
        setUserSettings: (state, action) => {
            state.settings = action.payload;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;