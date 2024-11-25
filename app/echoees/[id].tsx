import { Connect } from "@/components/echoees/connect";
import { Follow } from "@/components/echoees/follow";
import FollowersDisplayCard from "@/components/echoees/followersDisplayCard";
import VideoThumbnail from "@/components/echoees/VideoThumbnail";
import { useGetUserQuery } from "@/redux/features/authApiSlice";
import { Ionicons } from "@expo/vector-icons";
import { skipToken } from "@reduxjs/toolkit/query";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator, Dimensions, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFetchDetailArtistByIdQuery, useFetchDetailCurrentArtistQuery, useFetchPortfolioQuery, useFetchSentConnectionRequestsQuery } from "../../redux/features/artistApiSlice";
import { useFetchChatBySlugQuery } from "../../redux/features/chatApiSlice";
import GenreList from "@/components/echoees/GenreList";
import PackageList from "@/components/echoees/PackageList";
import { LimitedFeedbacks } from "@/components/echoees/LimitedFeedbacks";
import LimitedConnections from "@/components/echoees/LimitedConnections";

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
                    <Ionicons style={{
                        position:'absolute',
                        top:40,
                        left:10,
                        zIndex:10
                    }} name="chevron-back" size={25} color={"#fff"} onPress={()=>router.back()}/>
                    <View style={{
                        position:'relative'
                    }}>
                    <ImageBackground style={styles.image} source={{uri:artist.user?.profile?.profile_image}}>

                    </ImageBackground>
                    </View>
                    <ScrollView>

                <View style={{
                    position:'relative',
                    backgroundColor:'transparent',
                    height:Dimensions.get('window').height/2,
                    width:Dimensions.get('window').width,
                    }}>

                </View>


                <View style={styles.detailsContainer}>
                <View style={{
                    flexDirection:'row',
                    alignItems:'center'

                }}>
                    <View style={{
                        flex:1
                    }}>
                        <Text style={styles.name}>{artist?.user.fullname}</Text>
                        <Text style={{fontSize:30, fontWeight:'bold', marginBottom:15}}>Echoee</Text>
                    </View>
                    {currentUser && currentUser.role==='client' &&
                    <TouchableOpacity
                        disabled={!artist.is_available}
                        onPress={()=>{
                            Linking.openURL(`${process.env.EXPO_PUBLIC_SITE}/${artist.slug}?open=1`)
                        .catch((err) => console.error("Failed to open URL:", err));
                        }}
                        style={{
                        backgroundColor:'dodgerblue',
                        padding:15,
                        borderRadius:10,
                        width:130,
                        alignItems:'center'
                    }}>
                        <Text
                            style={{
                                color:"#fff",
                                fontWeight:'bold',
                                fontSize:14
                            }}>
                                {artist.is_available ? 'Bring Me Onstage' : 'No Schedules Yet'}
                            </Text>
                    </TouchableOpacity>
}


                </View>
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

            <View style={{
                flexDirection:'row',
                backgroundColor:'lightgray',
                borderRadius:10,
                elevation:2,
                padding:10,
                flex:1,
                alignItems:'center',
                justifyContent:'space-between',
                gap:4,
                marginBottom:20,
                }}>
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center',

                        gap:4

                    }}>
                        <View style={{
                                    flexDirection:'row',
                                    gap:4
                                }}>
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
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                   {currentUser && artist.user.id !== currentUser.id && <Follow refetch={refetch} artist={artist}/>}
                    <FollowersDisplayCard artistId={artist.id.toString()}/>
                    </View>
                    </View>

                </View>

                <GenreList artist={artist}/>
                <PackageList artist={artist}/>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'

                }}>
                    <Text style={styles.headerTitle}>Reviews</Text>
                    <Link style={{
                        fontWeight:'bold',
                        fontSize:14,
                        color:'dodgerblue',

                        marginTop:10,
                        marginBottom:10,

                    }} href={`/feedbacks/${artist.id}`}>See All Reviews</Link>

                 </View>
                    <LimitedFeedbacks artistId={artist.id}/>
                    <View style={{
                    flexDirection:'row',
                    justifyContent:'space-between',
                    alignItems:'center'

                }}>
                    <Text style={styles.headerTitle}>My Connections</Text>
                    <Link style={{
                        fontWeight:'bold',
                        fontSize:14,
                        color:'dodgerblue',

                        marginTop:10,
                        marginBottom:10,

                    }} href={`/followers/${artist.id}`}>See All Connections</Link>

                 </View>
                 <LimitedConnections artistId={artist.id}/>

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
    headerTitle:{
        fontSize:18,
        fontWeight:'bold',
        color:'rgba(0,0,0,0.4)',

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
