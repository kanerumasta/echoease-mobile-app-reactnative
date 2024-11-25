import { useAcceptConnectionRequestMutation, useDeclineConnectionRequestMutation, useFetchReceivedConnectionRequestsQuery } from "@/redux/features/artistApiSlice"
import { ArtistInSchema, ConnectionRequestSchema } from "@/schemas/artist-schemas"
import { ActivityIndicator, Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Toast from "react-native-toast-message"
import { z } from "zod"

export default function ConnectionRequests (){
    const {data:connectionRequests,isLoading, refetch} = useFetchReceivedConnectionRequestsQuery(undefined,{
        refetchOnMountOrArgChange: true,
    })

    return <View>

        <FlatList
        ListEmptyComponent={<View style={styles.emptyListContainer}>
            <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color:'rgba(0,0,0,0.3)'
            }}>Empty Connection Requests</Text>
            </View>}
            data={connectionRequests}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={refetch}/>}
            renderItem={({item})=>(
                <Card key={item.id} request={item}/>
            )}
        />

    </View>
}

const Card = ({request}:{request:z.infer<typeof ConnectionRequestSchema>}) => {
    const {sender} = request
    const [acceptConnectionRequest,{isLoading:accepting}] = useAcceptConnectionRequestMutation()
    const [declineConnectionRequest,{isLoading:rejecting}] = useDeclineConnectionRequestMutation()
    const handleAction = async(action:'accept'|'reject') => {
        if(action === 'accept') {
        await acceptConnectionRequest(request.id.toString()).then(()=>{
            Toast.show({
                text1: "Request accepted successfully",
                type: "success"
            })
        }).catch(()=>{
            Toast.show({
                text1: "Failed to accept request. Please check your internet connection",
                type: "error"
            })
        })
    }
    if(action === 'reject'){
        await declineConnectionRequest(request.id.toString()).then(()=>{
            Toast.show({
                text1: "Request declined successfully",
                type: "success"
            })
        }).catch(()=>{
            Toast.show({
                text1: "Failed to reject request. Please check your internet connection.",
                type: "error"
            })
        })
    }
    }
    return <View style={styles.cardContainer

    }>
        <Image style={styles.image} source={{uri:`${process.env.EXPO_PUBLIC_BACKEND_URL}${sender.user.profile.profile_image}`}}/>
        <View style={{
            flex:1,

        }}>
        <Text style={styles.name}>{sender.user.fullname}</Text>
        <View style={styles.actionButtonContainer}>
        <TouchableOpacity onPress={()=>handleAction('accept')} style={[styles.actionButton,{backgroundColor:'dodgerblue'}]}><Text style={{
            color:'#fff',
            fontWeight:'bold',
            fontSize:16
        }}>{accepting && <ActivityIndicator color={"#fff"}/>}{accepting ? 'Loading' :'Accept'}</Text></TouchableOpacity>
        <TouchableOpacity onPress={()=>handleAction('reject')} style={[styles.actionButton,{backgroundColor:'#f31260'}]}><Text style={{
            color:'#fff',
            fontWeight:'bold',
            fontSize:16
        }}>{rejecting && <ActivityIndicator color={"#fff"}/>}{rejecting ? 'Loading' :'Decline'}</Text></TouchableOpacity>
        </View>
        </View>
    </View>
}


const styles = StyleSheet.create({
    image:{
        width:100,
        height:100,
        borderRadius:10,
        resizeMode: 'cover'
    },
    name:{
        fontSize:18,
        fontWeight:'bold'
    },
    cardContainer:{
        flexDirection:'row',
        gap:4,
        margin:10,
        padding:8,
        backgroundColor:'#fff',
        borderRadius:10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    actionButtonContainer:{
        flexDirection:'row',
        gap:4,
        alignItems:'flex-end',
        flex:1,


    },
    actionButton:{
        padding:12,
        elevation:4,
        borderRadius:5,
        flex:1,
        alignItems:'center',
        justifyContent:'center',

    },
    emptyListContainer:{

        height:Dimensions.get('window').height - 60,
        justifyContent:'center',
        alignItems:'center',


    }
})
