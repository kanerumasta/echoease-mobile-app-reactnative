import { useDisconnectArtistMutation } from "@/redux/features/artistApiSlice"
import { Ionicons } from "@expo/vector-icons"
import { ActivityIndicator, TouchableOpacity } from "react-native"
import Toast from "react-native-toast-message"

export const DisconnectEchoee = ({echoeeId}:{echoeeId:number}) => {
const [disconnect,{isLoading}] = useDisconnectArtistMutation()
const handleDisconnect = async () => {
    await disconnect(echoeeId.toString()).unwrap()
    .then(()=>{
        Toast.show({
            text1: 'Echoee disconnected successfully',
            type:'success',
            visibilityTime: 3000,
        })
    })
    .catch(() => {
        Toast.show({
            text1: 'Failed to disconnect Echoee',
            type:'error',
            visibilityTime: 3000,
        })
    })
}
    return  <TouchableOpacity onPress={handleDisconnect} style={{
        width:30,
        height:30,
        borderRadius:4,
        backgroundColor:"#fd3774",
        justifyContent: 'center',
        alignItems: 'center',
    }}>
    {isLoading ? <ActivityIndicator color={"#fff"}/> :<Ionicons size={20} color={"#fff"} name="remove-sharp"/>}
</TouchableOpacity>
}
