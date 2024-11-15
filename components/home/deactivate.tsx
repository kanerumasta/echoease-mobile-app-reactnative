import { useDeactivateUserMutation } from "@/redux/features/authApiSlice";
import { UserSchema } from "@/schemas/user-schemas";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dialog  from "react-native-dialog";
import Toast from "react-native-toast-message";
import { z } from "zod";



type DeactivateProps = {
    user:z.infer<typeof UserSchema>
}
export default function Deactivate ({user}:DeactivateProps){
    const [dialogVisible,setDialogVisible] = useState(false)
    const router = useRouter()
    const [deactivateUser,{isLoading}] = useDeactivateUserMutation()
    const handleDeactivate = async () => {
        await deactivateUser().unwrap().then(
            async()=>{
                Toast.show({
                    text1:'Your account is now deactivated',
                    text2:'Logging out',
                    type:'success',
                    visibilityTime:2000
                })
                setDialogVisible(false)
                await AsyncStorage.clear()
                router.replace('/login')
            }
        ).catch(
            ()=>{
                Toast.show({
                    text1:'Failed to deactivate account. Try again later.',
                    type:'error',
                    visibilityTime:2000
                })
                setDialogVisible(false)
            }
        );
    }
    return <View style={styles.mainContainer}>
            <TouchableOpacity onPress={()=>{setDialogVisible(true)}} >
                <Text>Deactivate Account</Text>
            </TouchableOpacity>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title style={{color:"#f31260",fontWeight:'bold'}}>Deactivate Account</Dialog.Title>
                <Dialog.Description>Are you sure you want to deactivate your account? This action cannot be undone.</Dialog.Description>
                <Dialog.Button disabled={isLoading} style={{backgroundColor:'#f31260', color:'#fff', borderRadius:5}} label={isLoading ? "Deactivating":"Deactivate"} onPress={handleDeactivate} />
                <Dialog.Button style={{backgroundColor:'rgba(0,0,0,0.4)', marginLeft:5, color:'#fff', borderRadius:5}} label="Cancel" onPress={() => setDialogVisible(false)} />
            </Dialog.Container>
    </View>

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
