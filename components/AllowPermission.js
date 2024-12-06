import { StyleSheet, View, Text, Button } from "react-native";

const AllowPermission = ({title, func} ) => {
    return <View style={styles.container}>
        <Text style={styles.permTxt}>Please allow app to use {title} to continue </Text>
        <Button title='Allow access to ${}' onPress={func}></Button>
    </View>;
}

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
});


export default AllowPermission;