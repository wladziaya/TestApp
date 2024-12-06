import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import useBluetooth from '../../hooks/useBle'


const BluetoothScanner = () => {
    const scannedDevices = useSelector((state) => state.bluetooth.devices);
    const { scanning, scanDevices, clearScannedDevices } = useBluetooth();

    return (
        <View style={styles.container}>
            <Button title={scanning ? "Scanning..." : "Scan Bluetooth Devices"} onPress={scanDevices} disabled={scanning} />
            <FlatList
                data={scannedDevices}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.device}>
                        <Text>{item.name}</Text>
                        <Text>{item.id}</Text>
                    </View>
                )}
            />
            <Button title="Clear Scanned Devices" onPress={clearScannedDevices} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    device: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default BluetoothScanner;