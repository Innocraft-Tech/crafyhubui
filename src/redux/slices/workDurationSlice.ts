import { createSlice } from '@reduxjs/toolkit';

const workDurationSlice = createSlice({
  name: 'workDuration',
  initialState: { count: 0 },
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = workDurationSlice.actions;
export default workDurationSlice.reducer;
