import { UserSchema } from "@/schemas/user-schemas";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { z } from "zod";



type EditProfileProps = {
    user:z.infer<typeof UserSchema>
}
export default function EditProfile ({user}:EditProfileProps){
    return <TouchableOpacity onPress={()=>{}} style={styles.mainContainer}>
        <Text>Edit Profile</Text>
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
