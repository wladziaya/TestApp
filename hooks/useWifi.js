import { useState } from "react";
import WifiManager from "react-native-wifi-reborn";
import { useDispatch } from "react-redux";
import { setNetworks, clearNetworks } from "../redux/reducers/slices/wifiReducer";

const useWifi = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const scanWiFi = async () => {
        try {
            setLoading(true);
            const results = await WifiManager.loadWifiList();
            dispatch(setNetworks(results));
        } catch (error) {
            console.error("Error scanning Wi-Fi networks:", error);
            throw new Error("Failed to scan Wi-Fi networks.");
        } finally {
            setLoading(false);
        }
    };

    const connectToNetwork = async (ssid, wifiPassword) => {
        if (!ssid || !wifiPassword) {
            throw new Error("Please provide both SSID and password.");
        }

        try {
            await WifiManager.connectToProtectedSSID(ssid, wifiPassword, false);
        } catch (error) {
            console.error("Error connecting to network:", error);
            throw new Error("Failed to connect to the network.");
        }
    };

    const clearScannedNetworks = () => {
        dispatch(clearNetworks());
      };

    return { loading, scanWiFi, connectToNetwork, clearScannedNetworks};
};

export default useWifi;
