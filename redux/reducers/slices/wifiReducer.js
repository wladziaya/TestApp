import { createSlice } from '@reduxjs/toolkit';

const wifiSlice = createSlice({
  name: 'wifi',
  initialState: {
    networks: [],
  },
  reducers: {
    setNetworks: (state, action) => {
      console.log(action.payload);
      
      state.networks = action.payload;
    },
    clearNetworks: (state) => {
      state.networks = [];
    },
  },
});

export const { setNetworks, clearNetworks } = wifiSlice.actions;
export default wifiSlice.reducer;
