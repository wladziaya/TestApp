import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Dimensions } from 'react-native';
const { width } = Dimensions.get("window");


const ConnectionForm = ({ SSID, setSSID, password, setPassword, onConnect }) => {

    const closeForm = () => {
        setSSID('');
        setPassword('');
    };

    return (
        <View style={styles.connectionContainer}>
            <TouchableOpacity onPress={closeForm}>
                <Text style={styles.closeButton}>✖️</Text>
            </TouchableOpacity>
            <Text style={styles.selectedSSIDText}>Selected Network: {SSID}</Text>
            <TextInput
                style={styles.passwordInput}
                placeholder="Enter Wi-Fi Password"
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
            />
            <Button title="Connect" onPress={onConnect} />
        </View>
    )
};

const styles = StyleSheet.create({
    connectionContainer: {
        zIndex: 2,
        position: 'absolute',
        backgroundColor: '#fff',
        margin: 'auto',
        alignSelf: 'center',
        width: width,
        height: 300,
        top: '25%',
        padding: 15,
        borderRadius: 5,
        marginBottom: 15,
        backgroundColor: '#ececec',
    },
    selectedSSIDText: {
        fontSize: 16,
        marginBottom: 10,
    },
    passwordInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
    },
    closeButton: {
        fontSize: 16,
        textAlign: 'right'
    },
});

export default ConnectionForm;