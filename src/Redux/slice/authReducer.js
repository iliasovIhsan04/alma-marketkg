import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  error: null,
  loading: false,
  message: "",
  phone: "",
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action) {
      state.loading = false;
      state.user = action.payload;
      state.message = action.payload.message;
      state.phone = action.payload.phone;
    },
    registerFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const { registerStart, registerSuccess, registerFailure } =
  authReducer.actions;

export const registerUser = (userData) => async (dispatch) => {};

export default authReducer.reducer;
