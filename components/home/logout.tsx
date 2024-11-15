import AsyncStorage from "@react-native-async-storage/async-storage"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

import { useLogoutUserMutation, useGetUserQuery } from "@/redux/features/authApiSlice"
import apiSlice from "@/redux/services/apiSlice"
import { useDispatch } from "react-redux"
import { useRouter } from "expo-router"
import { useNotificationSocket } from "@/providers"

export const Logout = ()  => {
    const dispatch = useDispatch()
    const notificationSocket = useNotificationSocket()
    const [logoutUser ] = useLogoutUserMutation()
    const router = useRouter()
    const handleLogout = async () => {
        dispatch(apiSlice.util.resetApiState())
        await AsyncStorage.clear()
        await logoutUser()
        notificationSocket.disconnect() //disconnect from notification socket
        router.replace('/login')
    }
    return <TouchableOpacity style={styles.mainContainer} onPress={handleLogout}>
        <Text>Logout</Text>
    </TouchableOpacity>
}



const styles = StyleSheet.create({
    mainContainer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth:1,
        width:'80%',
        height:50,
        borderColor:'dodgerblue',
        padding:10,
        borderRadius:4
    }
})
