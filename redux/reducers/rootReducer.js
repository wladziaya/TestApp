import { combineReducers } from '@reduxjs/toolkit';
import barcodeReducer from './slices/barcodeReducer' ;
import wifiReducer from './slices//wifiReducer';
import bluetoothReducer from './slices/bluetoothReducer';
import userReducer from './slices/usersReducer'

const rootReducer = combineReducers({
  barcode: barcodeReducer,
  wifi: wifiReducer,
  bluetooth: bluetoothReducer,
  user: userReducer,
});

export default rootReducer;