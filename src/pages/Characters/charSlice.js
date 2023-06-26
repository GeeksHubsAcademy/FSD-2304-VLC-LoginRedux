import { createSlice } from "@reduxjs/toolkit";

export const charSlice = createSlice({
  name: "chars",
  initialState: {
    id: ""
  },
  reducers: {
    saveId: (state, action) => {
      let { payload } = action;
      state.id = payload.id
    }
  },
});

export const charData = (state) => state.chars;
export const { saveId } = charSlice.actions;
export default charSlice.reducer;
