import { ActivityIndicator, View } from "react-native"

export const EchoeeCardSkeleton = () => {
    return <View style={{
        width:150,
        height:200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(255,255,255,0.1)',
        margin:8,
        borderRadius:10
    }}>
        <ActivityIndicator color={'dodgerblue'}/>
    </View>
}
