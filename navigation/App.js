import { Provider } from 'react-redux';
import store from '../redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import BarcodeScanner from './screens/Barcode';
import Wifi from './screens/Wifi';
import BluetoothScanner from './screens/Bluetooth';
import Map from './screens/Map';

const Stack = createNativeStackNavigator();


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Barcode Scanner" component={BarcodeScanner} />
          <Stack.Screen name="Wi-Fi Scanner" component={Wifi} />
          <Stack.Screen name="Bluetooth Scanner" component={BluetoothScanner} />
          <Stack.Screen name="Map" component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;