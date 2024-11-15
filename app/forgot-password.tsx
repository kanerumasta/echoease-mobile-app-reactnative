import { useResetPasswordMutation } from "@/redux/features/authApiSlice";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import Toast from "react-native-toast-message";

export default function ForgotPassword(){
    const [resetPassword,{isLoading, isError}] = useResetPasswordMutation()
    const [hasError, setHasError] = useState(false)
    const [email,setEmail] = useState("")
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(()=>{
        if(hasError){
            setHasError(true)
            setEmail("")
            setTimeout(()=>{
                setHasError(false)
            },3000)
        }
    },[hasError])
    useEffect(()=>{})

    const handleSendEmail = async () => {
        // Trim leading and trailing whitespaces
        const trimmedEmail = email.trim();

        // Check for empty email
        if (!trimmedEmail) {
            setHasError(true);
            Toast.show({
                text1: "Email Required",
                text2: "Please enter your email address.",
                type: "error",
            });
            return;
        }

        // Validate email format
        if (!emailRegex.test(trimmedEmail)) {
            setHasError(true);
            Toast.show({
                text1: "Invalid Email",
                text2: "Please enter a valid email address.",
                type: "error",
            });
            return;
        }

        // Check if the email length is excessive
        if (trimmedEmail.length > 150) {
            setHasError(true);
            Toast.show({
                text1: "Email Too Long",
                text2: "Please enter a shorter email address.",
                type: "error",
            });
            return;
        }

        // Proceed with password reset
        await resetPassword(trimmedEmail).unwrap();
    };

    return <View style={{
                padding:15,

            }}>
            <View style={{
                paddingTop:80,
                marginBottom:20
                }}>
                <Text style={{
                    fontSize:30,
                }}>Forgot Password?</Text>
             </View>
        <View style={{

        }}>
            <TextInput onChangeText={setEmail} underlineColor={hasError ? "red":"dodgerblue"} activeUnderlineColor={hasError?"red":"dodgerblue"}  style={{}} placeholder="Enter your email"/>
            <TouchableOpacity onPress={handleSendEmail} style={styles.button}>
                {isLoading ? <ActivityIndicator /> :
                <Text style={{color:'#fff', textAlign:'center'}}>Send Password Reset</Text>
}
            </TouchableOpacity>
        </View>
    </View>
}


const styles = StyleSheet.create({
    input:{
    },
    button:{
        padding:20,
        backgroundColor:'dodgerblue',
        marginTop:14,
        borderRadius:10,
    }
})
