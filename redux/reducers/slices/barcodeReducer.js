import { createSlice } from '@reduxjs/toolkit';

const barcodeSlice = createSlice({
  name: 'barcode',
  initialState: {
    barcodesList: [], 
  },
  reducers: {
    addBarcode: (state, action) => {
      const newBarcode = action.payload;
      const exists = state.barcodesList.some((barcode) => barcode.id === newBarcode.id);

      if (!exists) {
        state.barcodesList.push(newBarcode); 
      }
    },
    clearBarcodes: (state) => {
      state.barcodesList = [];
    },
  },
});

export const { addBarcode, clearBarcodes } = barcodeSlice.actions;
export default barcodeSlice.reducer;
