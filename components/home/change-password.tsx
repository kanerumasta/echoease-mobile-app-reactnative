import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function ChangePassword (){
    return <TouchableOpacity style={styles.mainContainer} onPress={()=>{}}>
            <Text>Change Password</Text>
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
