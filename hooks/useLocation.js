import { useState, useEffect, useCallback } from "react";
import * as Location from "expo-location";

const useLocation = (shouldFetchLocation = true) => {
  const [userLocation, setUserLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(null);

  const fetchLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermissionGranted(false);
        return;
      }
      setPermissionGranted(true);

      const location = await Location.getCurrentPositionAsync();
      if (shouldFetchLocation) {
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
      }
    
    } catch (error) {
      console.error("Error fetching location:", error);
    }
}, [shouldFetchLocation]);

  useEffect(() => {
    fetchLocation();
  }, []);

  return { userLocation, permissionGranted, fetchLocation };
};

export default useLocation;
