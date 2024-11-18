import { Ionicons } from "@expo/vector-icons";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Dimensions, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFetchDetailArtistByIdQuery, useFetchDetailCurrentArtistQuery, useFetchPortfolioQuery, useFetchSentConnectionRequestsQuery } from "../../redux/features/artistApiSlice";
import { useFetchChatBySlugQuery } from "../../redux/features/chatApiSlice";
import { Connect } from "@/components/echoees/connect";
import { useGetUserQuery } from "@/redux/features/authApiSlice";
import { Feedbacks } from "@/components/echoees/feedbacks";

export default function EchoeeDetailPage(){
    const {id} = useLocalSearchParams<{id:string}>()
    const router = useRouter()
    const {data:artist, refetch} = useFetchDetailArtistByIdQuery(id,{refetchOnMountOrArgChange:true})
    const {data:currentUser} = useGetUserQuery()
    const {data:chat} = useFetchChatBySlugQuery(artist?.slug ? artist.slug : skipToken)
    const {data:portfolio, isLoading:portfolioLoading} = useFetchPortfolioQuery(id.toString())
    const {data:sentRequests} = useFetchSentConnectionRequestsQuery()
    const {data:detailCurrentArtist} = useFetchDetailCurrentArtistQuery()


    return <View style={styles.mainContainer}>
        {artist &&
        <>
            <View style={{position:'relative'}}>
                    <View style={{position:'absolute',zIndex:10, top:20, left:10}}>
                        <Text style={{color:"#fff"}}>Echoease</Text>
                    </View>
                    <ImageBackground style={styles.image} source={{uri:artist.user?.profile?.profile_image}}/>
                    <ScrollView>
                <View style={{
                    position:'relative',
                    backgroundColor:'transparent',
                    height:Dimensions.get('window').height/2,
                    width:Dimensions.get('window').width,
                    }}>

                </View>
                <View style={styles.detailsContainer}>

                <Text style={styles.name}>{artist?.user.fullname}</Text>
                <Text style={{fontSize:30, fontWeight:'bold', marginBottom:15}}>Echoee</Text>
                <Text
                    style={{
                        color:'rgba(0,0,0,0.5)',
                        fontSize:12,
                        marginBottom:20
                    }}
                >{artist.bio}</Text>
                <View
                    style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        marginTop:10,
                        alignItems: 'center',

                    }}
                >
                    <TouchableOpacity
                        onPress={()=>{
                            Linking.openURL(`${process.env.BACKEND_URL}/${artist.slug}?open=1`)
                        .catch((err) => console.error("Failed to open URL:", err));
                        }}
                        style={{
                        backgroundColor:'dodgerblue',
                        padding:15,
                        borderRadius:10,

                        width:130,
                        display:'flex',
                        alignItems:'center'
                    }}>
                        <Text
                            style={{
                                color:"#fff",
                                fontWeight:'bold',
                                fontSize:14
                            }}>Paminawa Ko</Text>
                    </TouchableOpacity>
                            <View style={{flexDirection:'row', alignItems:'center', gap:4}}>
                    <TouchableOpacity
                        onPress={()=>{
                           chat && router.push(`/messages/${chat.code}`)
                        }}
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
                        <Ionicons size={20} color={"#fff"} name="chatbubble"/>

                        </View>

                    </TouchableOpacity>
                    {currentUser &&
                    detailCurrentArtist &&
                    (detailCurrentArtist.id !== artist.id) &&
                    !sentRequests?.some(req=>req.receiver.id === artist.id)&&
                    !artist.connections.includes(currentUser.id) &&
                    !detailCurrentArtist.connections.includes(artist.id) &&
                    <Connect onConnect={refetch} echoeeId={artist.id}/>}
                    </View>

                </View>
                {/* PORTFOLIO */}
                <View>
                    <Text
                        style={{
                            fontWeight: "bold",
                    }}>Portfolio</Text>
                    {portfolioLoading && <ActivityIndicator />}
                    <View>
                        {portfolio && portfolio.items.map((item, index) => (
                          <View style={{
                            display: "flex",
                            flexDirection: "row",


                            marginBottom: 10,

                            backgroundColor:'red',
                            gap:4
                          }} key={item.id}>
                            {item.medias.map((media)=>(
                                <View key={media.id}>
                                    {media.media_type === 'image' && <Image style={{
                                        width:100,
                                        height:100
                                    }} source={{uri:`${process.env.BACKEND_URL}${media.file}`}}/>}
                                </View>
                            ))}
                          </View>
                        ))}
                    </View>
                </View>
                <Link href={`/feedbacks/${artist.id}`}>See Reviews</Link>

                </View>

                </ScrollView>
            </View>
        </>
}
    </View>

}

const styles = StyleSheet.create({
    image:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height / 2,
        position:'absolute',
        top:0,
        left:0,

        resizeMode: 'cover',
    },
    mainContainer:{

    },
    detailsContainer:{
        padding:20,
        backgroundColor:'#fff',
        position:"relative"

    },
    name:{
        fontSize:18,
        fontWeight: 'bold',
        color:"dodgerblue",

    },

})
