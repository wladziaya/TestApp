import { createSlice } from '@reduxjs/toolkit';

const bluetoothSlice = createSlice({
  name: 'bluetooth',
  initialState: {
    devices: [],
  },
  reducers: {
    addDevice: (state, action) => {
      const newDevice = action.payload;
      const exists = state.devices.some((ble) => ble.id === newDevice.id);

      if (!exists) {
        state.devices.push(newDevice); 
      }
    },
    clearDevices: (state) => {
      state.devices = [];
    },
  },
});

export const { addDevice, clearDevices } = bluetoothSlice.actions;
export default bluetoothSlice.reducer;