
import { Link, useRouter } from "expo-router";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MenuButton } from "../components/home/MenuButton";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotificationSocket } from "@/providers";
import { LinearGradient } from "expo-linear-gradient";
import { useGetUserQuery } from "@/redux/features/authApiSlice";
import { ActivityIndicator } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useFetchNewNotificationsQuery } from "@/redux/features/notificationApiSlice";
import EchoeaseCarousel from "@/components/home/carousel";

export default function Home(){
    const {connect} = useNotificationSocket()
    const {data:currentUser} = useGetUserQuery(undefined,{refetchOnMountOrArgChange:true})
    const router = useRouter()

    useEffect(()=>{

        const checkLogin  = async () => {

            const token = await AsyncStorage.getItem('accessToken')
            if (!token){
                router.replace('/login')
            }else{
                connect()
            }
        }
        checkLogin()
    },[])

    useEffect(()=>{

        if(currentUser){
            if(currentUser.is_deactivated){
                router.push('/activate')
            }
        }
    },[currentUser])



    // if(!currentUser){
    //     return <ActivityIndicator />
    // }
    return <LinearGradient colors={['#070f23','#11255c']} style={styles.mainContainer}>
        <Header />
        <ScrollView>
        <EchoeaseCarousel />
        <View style={styles.menuButtonContainer}>
            <MenuButton
                route="/profile"
                icon={<Image style={styles.icon}  source={require('../assets/images/profile.png')}/>}
                label="Profile"
            />
            <MenuButton
                route="/echoees/"
                icon={<Image style={styles.icon}  source={require('../assets/images/microphone.png')}/>}
                label="Echoees"
            />
            <MenuButton
                route="/bookings"
                icon={<Image style={styles.icon}  source={require('../assets/images/booking.png')}/>}
                label="Bookings"
            />
            <MenuButton
                route="/messages"
                icon={<Image style={styles.icon}  source={require('../assets/images/comments.png')}/>}
                label="Messages"
            />
            <MenuButton
                route="/transactions"
                icon={<Image style={styles.icon}  source={require('../assets/images/mobile-banking.png')}/>}
                label="Transactions"
            />
            <MenuButton
                route="Settings"
                icon={<Image style={styles.icon}  source={require('../assets/images/settings.png')}/>}
                label="Settings"
            />


            </View>
            </ScrollView>
    </LinearGradient>
}

const Header = () => {
    const {data:notifications} = useFetchNewNotificationsQuery()
    const router = useRouter()
    return <View style={{
        backgroundColor:"transparent",
        padding:10,
        flexDirection:'row',
        height:100,
        alignItems:'center',
        justifyContent:'space-between'
    }}>
        <View style={{
            flexDirection:'row',
            alignItems:'center',

        }}>
        <Image source={require('../assets/images/echoease-logo.png')} style={styles.logo}/>
        <Text style={{fontSize:20,color:'#fff', fontWeight:'bold'}}>EchoEase</Text>
        </View>
        <View style={{
            flexDirection:'row',
            alignItems:'center',
            gap:8

        }}>
        <View style={{position:'relative'}}>
            {notifications && notifications.length > 0 &&
            <View style={{position:'absolute',top:-10, right:-6,zIndex:10,backgroundColor:"#f31260", height:20, width:20, borderRadius:10, justifyContent:'center', alignItems:'center'}}>
            <Text style={{
                color:'#fff'
            }}>{notifications.length}</Text>
            </View>}
        <Ionicons onPress={()=>router.push('/connection-requests')} name="link" size={25} color={"white"}/>
        </View>
        <View style={{position:'relative'}}>
            {notifications && notifications.length > 0 &&
            <View style={{position:'absolute',top:-10, right:-6,zIndex:10,backgroundColor:"#f31260", height:20, width:20, borderRadius:10, justifyContent:'center', alignItems:'center'}}>
            <Text style={{
                color:'#fff'
            }}>{notifications.length}</Text>
            </View>}
        <Ionicons onPress={()=>router.push('/notifications')} name="notifications" size={25} color={"white"}/>
        </View>

        </View>
    </View>
}



const styles = StyleSheet.create({
    icon:{
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
    mainContainer:{
        paddingTop:15,
        height: '100%',

    },
    menuButtonContainer : {
        display:'flex',
        justifyContent:'center',
        gap:20,
        flexDirection:'row',
        flexWrap: 'wrap',
        backgroundColor:"transparent"


    },
    logo:{
        width:40,
        height:40,

    },
    heading:{


        marginBottom:30,
        flexDirection:'row',
        alignItems:'center',
        padding:10
    },
    brand:{
        fontSize:20,
        fontWeight:'bold'
    }

})
