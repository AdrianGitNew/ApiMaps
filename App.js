import * as Location from 'expo-location';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from '@env';

const carritoImage = require('./assets/image/carrito.png')

export default function App() {

  const [origin, setOrigin] = React.useState({
    latitude:32.07469894400577, 
    longitude:-81.08724728484022,
  });

  const [destination, setDestination] = React.useState({
    latitude:32.0663735416921, 
    longitude:-81.09633877757345,
  });

  React.useEffect(() => {
    getlocationpermission();
  }, [])

  async function getlocationpermission() {
    let {status} = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permiso denegado');
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setOrigin(current);
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude:  origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
        >
        <Marker 
          draggable
          coordinate={origin}
          image={carritoImage}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker 
          draggable
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections 
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor='lightblue'
          strokeWidth={4}
        /> 
        {/* <Polyline 
          coordinates={[origin,destination ]}
          strokeColor='pink'
          strokeWidth={4}
        /> */}
        </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%'
  }
});
