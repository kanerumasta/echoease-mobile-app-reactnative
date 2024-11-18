import { useConnectArtistMutation, useFetchDetailCurrentArtistQuery, useFetchSentConnectionRequestsQuery } from "@/redux/features/artistApiSlice"
import { useGetUserQuery } from "@/redux/features/authApiSlice"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { ActivityIndicator, TouchableOpacity, View } from "react-native"
import Toast from "react-native-toast-message"

export const Connect = ({echoeeId, onConnect}:{echoeeId:number, onConnect:()=>void}) => {
    const [connectArtist,{isLoading}] = useConnectArtistMutation()
    const {data:detailCurrentArtist} = useFetchDetailCurrentArtistQuery()

    const {data:currentUser} = useGetUserQuery()

    const handleConnect = async () => {
        if(!currentUser || !detailCurrentArtist) return
        const payload = {
            sender:detailCurrentArtist.id,
            receiver:echoeeId
        }
        await connectArtist(payload).unwrap().then(()=>{
            Toast.show({
                text1: "Artist connected successfully",
                type: "success",
                visibilityTime: 3000,
            })
            onConnect()
        }).catch(() => {
            Toast.show({
                text1: "Failed to connect artist",
                type: "error",
                visibilityTime: 3000,
            })
        })
    }
    return   <TouchableOpacity
    onPress={handleConnect}
    style={{
        flexDirection:'row',
        alignItems:'center',
        gap:4,
    }}
>
      <View
        style={{
            backgroundColor:"#9353d3",
            padding:6,
            borderRadius:30,

        }}
    >
   {isLoading ? <ActivityIndicator color={"#fff"}/> :  <Ionicons size={20} color={"#fff"} name="link"/>}

    </View>


</TouchableOpacity>
}
