import { Ionicons } from "@expo/vector-icons"
import { Dispatch, SetStateAction, useState } from "react"
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native"


type MessageInputProps = {
    onSend: (message: string) => void;
    message:string,
    setMessage:Dispatch<SetStateAction<string>>
}
export const MessageInput = ({onSend, message, setMessage}:MessageInputProps) => {

    return <View style={styles.mainContainer}>
        <TextInput onChangeText={setMessage} value={message} multiline style={styles.input} placeholder="Enter your message here..."/>
        <TouchableOpacity onPress={()=>{onSend(message)}}>
        <Ionicons size={30} color={"dodgerblue"} name="send"/>
        </TouchableOpacity>
    </View>
}

const styles  = StyleSheet.create({
    mainContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:'center'
,        paddingHorizontal: 10,

        backgroundColor: "#ffffff",
        borderRadius: 10,
        margin: 10
    },
    input:{
        flex: 1,
        padding:15

    }
})
