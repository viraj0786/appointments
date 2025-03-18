import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {},
  reducers: {
    bookSlot: (state, action) => {
      const { time, firstName, lastName, phone } = action.payload;
      state[time] = { firstName, lastName, phone };
    },
    clearSlot: (state, action) => {
      delete state[action.payload];
    },
  },
});

export const { bookSlot, clearSlot } = appointmentSlice.actions;
export default appointmentSlice.reducer;
