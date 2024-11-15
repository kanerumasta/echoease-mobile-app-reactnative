import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useActivateUserMutation } from '@/redux/features/authApiSlice'
import Toast from 'react-native-toast-message'
import { useRouter } from 'expo-router'

const Activate = () => {
    const [activateUser,{isLoading}] = useActivateUserMutation()
    const router = useRouter()
    const handleActivate = async () => {
       await activateUser().unwrap().then(()=>{
        Toast.show({
            text1: 'Account activated successfully',
            type:'success',
            visibilityTime: 3000,
        })
        router.replace('/login')

       }).catch(()=>{
        Toast.show({
            text1: 'Failed to activate account',
            type: 'error',
            visibilityTime: 3000,
        })
       })
    }
  return (
    <LinearGradient colors={['#000','#121024']} style={styles.mainContainer}>
        <View style={{ position:'relative'}}>
        <Image style={{width:250, height:250}} source={require('../assets/images/echo-sad.png')}/>
        </View>
        <Text style={styles.title}>Your acccount has been deactivated</Text>
        <Text style={styles.description}>If you want to reactivate your account just click the <Text>activate</Text> button.</Text>
        <TouchableOpacity onPress={handleActivate} disabled={isLoading} style={styles.button}>
           {isLoading && <ActivityIndicator color={"#fff"}/>}
            <Text style={styles.buttonText}>{isLoading ?'Activating': 'Activate' }</Text>
        </TouchableOpacity>

    </LinearGradient>
  )
}

export default Activate

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'gray',
        height: '100%',
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        backgroundColor:'dodgerblue',
        paddingVertical:20,
        paddingHorizontal:30,
        borderRadius:15,
        flexDirection:'row',
 alignItems:'center',
 gap:3
    },
    buttonText:{
        color:"#fff",
        fontSize:20,
        fontWeight:'bold',
        letterSpacing:1.5,

    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        marginBottom:20,
        color:"#fff"
    },
    description:{
        fontSize:14,

        textAlign:'center',
        marginBottom:20,
        color:"rgba(255,255,255,0.7)",
        lineHeight:25
    }
})
