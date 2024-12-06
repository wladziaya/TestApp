import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import useLocation from '../../hooks/useLocation';
import ConnectionForm from '../../components/ConnectionForm';
import AllowPermission from '../../components/AllowPermission';
import useWifi from '../../hooks/useWifi';



const Wifi = () => {
    const [selectedSSID, setSelectedSSID] = useState('');
    const [password, setPassword] = useState('');
    const wifiNetworks = useSelector((state) => state.wifi.networks);
    const { permissionGranted, fetchLocation } = useLocation(false);
    const { loading, scanWiFi, connectToNetwork, clearScannedNetworks } = useWifi();


    const handleConnect = async () => {
        try {
          await connectToNetwork(selectedSSID, password);
          Alert.alert("Success", `Connected to ${selectedSSID}`);
        } catch (error) {
          Alert.alert("Error", error.message);
        } finally {
          setSelectedSSID("");
        }
      };
    
    if (permissionGranted === null) {
        return <></>;
    }
    if (!permissionGranted) {
        return <AllowPermission title={'location'} func={fetchLocation} />;
    }

    const NetworkItem = ({ ssid, level, onPress }) => (
        <TouchableOpacity style={styles.networkItem} onPress={onPress}>
            <Text style={styles.networkSSID}>{ssid || "Unknown SSID"}</Text>
            <Text style={styles.networkRSSI}>Signal Strength: {level}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <Button title="Scan Wi-Fi Networks" onPress={scanWiFi} />
            {loading && <Text style={styles.loadingText}>Scanning...</Text>}
            {!loading && wifiNetworks.length === 0 && (
                <Text style={styles.infoText}>No networks found. Try scanning.</Text>
            )}
            <FlatList
                data={wifiNetworks}
                keyExtractor={(item) => item.BSSID}
                renderItem={({ item }) => (
                    <NetworkItem ssid={item.SSID} level={item.level} onPress={() => setSelectedSSID(item.SSID)} />
                )}
            />
            {selectedSSID && (
                <ConnectionForm SSID={selectedSSID} setSSID={setSelectedSSID} password={password} setPassword={setPassword}
                    onConnect={handleConnect}
                />
            )}
            <Button title="Clear Scanned Networks" onPress={clearScannedNetworks} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    permTxt: {
        textAlign: 'center',
        fontSize: 18,
        padding: 20
    },
    loadingText: {
        textAlign: "center",
        marginVertical: 10,
        fontSize: 16,
        color: "blue",
    },
    infoText: {
        textAlign: "center",
        marginVertical: 10,
        fontSize: 16,
        color: "gray",
    },
    networkItem: {
        backgroundColor: "#fff",
        padding: 15,
        marginBottom: 10,
        borderRadius: 5,
    },
    networkSSID: {
        fontSize: 18,
        fontWeight: "bold",
    },
    networkRSSI: {
        color: "gray",
    },
});

export default Wifi;