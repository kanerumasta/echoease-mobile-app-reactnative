import { View } from "react-native"
import MapView,{Marker} from 'react-native-maps'

export default function Map(){
    const lat = 10.0669407
    const lng = 124.38172439999998
    return <View style={{height:500}}>
        <MapView
            style={{flex:1}}
            initialRegion={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }}
        >
            <Marker

                coordinate={{latitude: lat, longitude: lng}}
                title="Concert NI"
                description="Soom Trinidad Bohol Philippines"
            />


        </MapView>
    </View>
}
