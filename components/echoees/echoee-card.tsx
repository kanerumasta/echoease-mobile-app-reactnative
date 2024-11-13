import { z } from "zod"
import { ArtistInSchema } from "../../schemas/artist-schemas"
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Link, useRouter } from "expo-router"


type EchoeeCardProps = {
    echoee:z.infer<typeof ArtistInSchema>
}
export const EchoeeCard = ({echoee}:EchoeeCardProps)=> {

    const router = useRouter()

    return  <TouchableOpacity onPress={()=>router.push(`/echoees/${echoee.id}`)} style={styles.mainContainer}>
        {echoee && <Image style={{width:'100%', height:'100%'}} source={{uri:echoee.user?.profile?.profile_image}}/>}
        <LinearGradient
        colors={['transparent','transparent','rgba(0,0,0,1)']}
        style={{
            position:'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,

            justifyContent:'center',
            alignItems:'center'
        }} />
        <Text style={styles.name}>{echoee.user.fullname}</Text>
    </TouchableOpacity>

}

const styles = StyleSheet.create({
    mainContainer:{
        display:'flex',
        margin:8,

        marginBottom:10,
        height:200,
        width:150,
        borderRadius:10,
        overflow:'hidden',
        position:'relative',
        elevation:4
    },
    name:{
        position:'absolute',
        bottom:10,
        left:6,
        color:'#fff',
        fontSize:20,
        fontWeight:'bold'
    }
})
