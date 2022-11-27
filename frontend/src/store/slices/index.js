import { fetchproblems } from "../api/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
export const fetchproblemsas = createAsyncThunk("fetchproblemsas", async (data) => {
  const res = await fetchproblems(data);
  return res.data.message;
});
const initialState = {
  admin: {},
  user: {},
  adminvalue: 0,
  uservalue: 0,
};
const slice = createSlice({
  name: "demo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchproblemsas.fulfilled, (state, action) => {
      let type = sessionStorage.getItem("type");
      if (type === "user") {
        state.user.doubts = action.payload;
        state.uservalue += 1;
      }
      if (type === "admin") {
        state.admin.doubts = action.payload;
        state.adminvalue += 1;
      }
    });
  },
});

export default slice.reducer;
