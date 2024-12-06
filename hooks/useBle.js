import { useState, useCallback } from 'react';
import { Alert, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from "react-native-ble-plx";
import { useDispatch } from 'react-redux';
import { addDevice, clearDevices } from '../redux/reducers/slices/bluetoothReducer';

const useBluetooth = () => {
  const [scanning, setScanning] = useState(false);
  const dispatch = useDispatch();
  const bleManager = new BleManager();

  const requestAndroid31Permissions = async () => {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Bluetooth Low Energy requires Location",
        buttonPositive: "OK",
      }
    );

    return (
      bluetoothScanPermission === "granted" &&
      bluetoothConnectPermission === "granted" &&
      fineLocationPermission === "granted"
    );
  };

  const requestPermissions = async () => {
    if (Platform.OS === "android") {
      if ((Platform.Version ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Location Permission",
            message: "Bluetooth Low Energy requires Location",
            buttonPositive: "OK",
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const isAndroid31PermissionsGranted =
          await requestAndroid31Permissions();

        return isAndroid31PermissionsGranted;
      }
    } else {
      return true;
    }
  };

  const scanDevices = useCallback(async () => {
    const permission = await requestPermissions();
    if (!permission) {
      return;
    }

    setScanning(true);
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        setScanning(false);
        handleError(error);
        return;
      }

      if (device && device.id) {
        const newDevice = {
          id: device.id,
          name: device.name || "Unnamed Device",
        };
        dispatch(addDevice(newDevice));
      }
    });

    setTimeout(() => {
      bleManager.stopDeviceScan();
      setScanning(false);
    }, 5000);
  }, [dispatch, bleManager]);

  const handleError = (error) => {
    if (error.message.includes("BluetoothLE is powered off")) {
      Alert.alert("Bluetooth Error", "Bluetooth is turned off. Please enable Bluetooth and try again.");
    } else {
      Alert.alert("Error", "An error occurred while scanning Bluetooth devices.");
    }
  };

  const clearScannedDevices = () => {
    dispatch(clearDevices());
  };

  return {
    scanning,
    scanDevices,
    clearScannedDevices,
  };
};

export default useBluetooth;
