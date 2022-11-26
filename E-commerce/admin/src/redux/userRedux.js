import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
    },

    // Get
    getUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },
    getUsersFauilure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Delete
    deleteUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteUsersSuccess: (state, action) => {
      state.isFetching = false;
      // ** delete only way in (Redux-Toolkit) **
      state.users.splice(
        state.users.findIndex((item) => item._id === action.payload),
        1
      );
    },
    deleteUsersFauilure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Update
    updateUsersStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUsersSuccess: (state, action) => {
      state.isFetching = false;
      state.users[
        state.users.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.user;
    },
    updateUsersFauilure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    // Add
    addUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addUserSuccess: (state, action) => {
      state.isFetching = false;
      state.users.push(action.payload);
    },
    addUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  getUsersStart,
  getUsersSuccess,
  getUsersFauilure,
  deleteUsersStart,
  deleteUsersSuccess,
  deleteUsersFauilure,
  updateUsersStart,
  updateUsersSuccess,
  updateUsersFauilure,
  addUsersStart,
  addUsersSuccess,
  addUsersFauilure,
} = userSlice.actions;
export default userSlice.reducer;
