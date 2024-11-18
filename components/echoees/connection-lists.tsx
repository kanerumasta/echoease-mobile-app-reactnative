import { useFetchMyConnectionsQuery } from "@/redux/features/artistApiSlice"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { DisconnectEchoee } from "./disconnect"

export const Connections = ()=>{
    const {data:connectionData} = useFetchMyConnectionsQuery()
    const router = useRouter()

    if(connectionData && connectionData.connections.length <= 0){
        return
    }
    return <View>
        <Text style={{
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
            marginTop: 20,
            paddingHorizontal: 10,
            paddingVertical: 5,


        }}>My Connections</Text>
        {connectionData && connectionData.connections.map((echoee) =>(
            <TouchableOpacity onPress={()=>router.push(`/echoees/${echoee.id}`)} style={{marginHorizontal:10,
                padding:10,
                backgroundColor:"#fff",
                marginVertical:4,
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap:4,
                elevation:3,

                borderRadius:8,
            }} key={echoee.id} >
                <View style={{
                     flexDirection:'row',
                     alignItems: 'center',
                     gap:4,
                }}>
                <Image style={{
                    width:50,
                    height:50,
                    borderRadius:40,
                    marginVertical:5,
                    marginLeft:10
                }} source={{uri:`${process.env.BACKEND_URL}${echoee.user.profile.profile_image}`}} resizeMode="cover"/>
                <Text style={{
                    fontWeight:'bold',

                }}>{echoee.user.fullname}</Text>
                </View>
                   <DisconnectEchoee echoeeId={echoee.id} />
            </TouchableOpacity>
        ))}
    </View>
}
