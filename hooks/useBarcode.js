import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addBarcode, clearBarcodes } from '../redux/reducers/slices/barcodeReducer';
import { useCameraPermissions } from 'expo-camera';

const useBarcodeScanner = () => {
  const [scanned, setScanned] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const dispatch = useDispatch();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const handleBarcodeScanned = useCallback(({ data, type }) => {
    console.log(data, type);
    setScanned(true);
    const barcode = { id: data, type };
    dispatch(addBarcode(barcode));
  }, [dispatch]);

  const resetScan = () => setScanned(false);

  const clearScannedBarcodes = () => {
    dispatch(clearBarcodes());
  };

  return {
    scanned, permission, requestPermission, handleBarcodeScanned, resetScan, clearScannedBarcodes,
  };
};

export default useBarcodeScanner;
