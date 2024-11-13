import { z } from "zod"
import { UserSchema } from "@/schemas/user-schemas"
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useState } from "react"
import EditProfile from "./edit-profile"
import ChangePassword from "./change-password"
import { Logout } from "./logout"

type HeaderProps = {
    user:z.infer<typeof UserSchema>
}

export default function Header({user}:HeaderProps){
    const [modalVisible, setModalVisible] = useState(false)
return <View style={styles.mainContainer}>
    <Image style={styles.profilePic} source={{uri:user.profile?.profile_image}}/>
    <Text style={styles.name}>{user.fullname}</Text>
    <EditButton onPress={()=>{setModalVisible(true)}}/>
    <Modal transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
        <View style={styles.modalView}>
            <EditProfile user={user}/>
            <ChangePassword />
            <Logout />

            <TouchableOpacity onPress={()=>{setModalVisible(false)}}>
                <Text>Close</Text>
            </TouchableOpacity>
        </View>
        </View>
    </Modal>


</View>

}

const EditButton = ({onPress}:{onPress:()=>void}) => {
    return <TouchableOpacity style={styles.editButton} onPress={onPress}>
        <Ionicons style={{}} name="ellipsis-horizontal-outline"/>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    name:{
        fontSize:18,
        fontWeight: 'bold',

    },
    editButton:{
        position:'absolute',
        top:10,
        right:10
    },
    mainContainer:{
        padding:10,
        position: 'relative',
        backgroundColor:'white',
        margin:20,
        borderRadius:7,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap:4,


    },
    profilePic:{
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white'
    },
    modalContainer:{
        justifyContent:'center',
        alignItems:'center',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        backgroundColor:'rgba(0,0,0,0.5)',

    },
    modalView:{
        display:'flex',
        gap:8,
        alignItems: 'center',
        width:'80%',
        padding:20,
        borderRadius:10,
        backgroundColor:'#fff'


    },

})
