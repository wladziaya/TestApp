import { StyleSheet, View } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { useSelector } from "react-redux";
import { getRandomCoordinates } from '../../utils/getRandomCoords';
import useLocation from '../../hooks/useLocation';
import AllowPermission from '../../components/AllowPermission';

const Map = () => {
    const { userLocation, permissionGranted, fetchLocation } = useLocation();
    const wifiNetworks = useSelector((state) => state.wifi.networks);
    const bluetoothDevices = useSelector((state) => state.bluetooth.devices);

    if (!permissionGranted) {
        return <AllowPermission title={'location'} func={fetchLocation} />;
    }

    if (!userLocation) {
        return <></>
    }

    return (
        <View style={styles.container} >
            <MapView style={styles.map}
                initialRegion={{ latitude: userLocation.latitude, longitude: userLocation.longitude, latitudeDelta: 0.001, longitudeDelta: 0.001 }}
            >
                {wifiNetworks.map((net, index) =>
                (<Marker key={index}
                    coordinate={getRandomCoordinates(userLocation)}
                    title={net.SSID}
                    description={net.BSSID}
                    pinColor='green' />))}
                {bluetoothDevices.map((device) => (
                    <Marker key={device.id}
                        coordinate={getRandomCoordinates(userLocation)}
                        title={device.name}
                        description={device.id}
                        pinColor='lightblue' />
                ))}

                <Marker coordinate={userLocation}
                    title="You are here"
                    description="This is your current location"
                />
            </MapView>
        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    container: {
        flex: 1,
        padding: 20,
    },
    permTxt: {
        textAlign: 'center',
        fontSize: 18,
        padding: 20
    },
});

export default Map;