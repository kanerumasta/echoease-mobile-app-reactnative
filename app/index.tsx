
import { Link, useRouter } from "expo-router";
import { Image, StyleSheet, Text, View } from "react-native";
import { MenuButton } from "../components/home/MenuButton";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home(){
    const router = useRouter()
    useEffect(()=>{
        const checkLogin  = async () => {
            const token = await AsyncStorage.getItem('accessToken')
            if (!token){
                router.replace('/login')
            }
        }
        checkLogin()
    },[])
    return <View style={styles.mainContainer}>
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
                route="Settings"
                icon={<Image style={styles.icon}  source={require('../assets/images/settings.png')}/>}
                label="Settings"
            />
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
