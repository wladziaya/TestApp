import { StyleSheet, Text, View, Button, FlatList, Pressable } from 'react-native';
import { CameraView } from "expo-camera";
import { useSelector } from 'react-redux';
import AllowPermission from '../../components/AllowPermission';
import useBarcodeScanner from '../../hooks/useBarcode';


const BarcodeScanner = ({ navigation }) => {
    const { scanned, permission, requestPermission, handleBarcodeScanned, resetScan, clearScannedBarcodes } = useBarcodeScanner();
    const scannedBarcodes = useSelector((state) => state.barcode.barcodesList);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {

        return <AllowPermission title={'camera'} func={requestPermission} />;
    }

    return (
        <View style={{ flex: 1 }}>
            <CameraView
                onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                style={styles.cam}
            />
            <FlatList
                data={scannedBarcodes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <Text style={styles.item}>{item.type}: {item.id}</Text>}
            />
            {scanned && <Pressable style={styles.scanAgan} onPress={resetScan} >
                <Text style={styles.scanAganTxt}>Tap to Scan Again</Text>
            </Pressable>}
            <Button title="Clear Scanned Barcodes" onPress={clearScannedBarcodes} />
        </View>
    )
}

const styles = StyleSheet.create({

    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    cam: {
        height: '50%'
    },
    scanAgan: {
        position: 'absolute',
        top: '22%',
        zIndex: 2,
        backgroundColor: '#2196F3',
        padding: 15,
        alignSelf: 'center',
        borderRadius: 7
    },
    scanAganTxt: {
        color: '#fff',
        fontSize: 18
    }

});



export default BarcodeScanner;