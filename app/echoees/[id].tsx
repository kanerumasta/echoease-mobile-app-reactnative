import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { useFetchDetailArtistByIdQuery, useFetchPortfolioQuery } from "../../redux/features/artistApiSlice";
import { ActivityIndicator, Dimensions, Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFetchChatBySlugQuery } from "../../redux/features/chatApiSlice";
import { skipToken } from "@reduxjs/toolkit/query";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function EchoeeDetailPage(){
    const {id} = useLocalSearchParams<{id:string}>()
    const router = useRouter()
    const {data:artist} = useFetchDetailArtistByIdQuery(id)
    const {data:chat} = useFetchChatBySlugQuery(artist?.slug ? artist.slug : skipToken)
    const {data:portfolio, isLoading:portfolioLoading} = useFetchPortfolioQuery(id.toString())


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
                            Linking.openURL(`http://192.168.1.242:3000/${artist.slug}?open=1`)
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
                                backgroundColor:"dodgerblue",
                                padding:10,
                                borderRadius:30,

                            }}
                        >
                        <Ionicons size={25} color={"#fff"} name="chatbubble"/>

                        </View>
                        <Text>
                            <Text
                                style={{
                                    color:"dodgerblue",
                                    fontWeight:'bold',
                                    fontSize:14,

                                }}
                            >Message</Text>
                        </Text>
                    </TouchableOpacity>


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
                                    }} source={{uri:`http://192.168.1.242:8000${media.file}`}}/>}
                                </View>
                            ))}
                          </View>
                        ))}
                    </View>
                </View>

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
