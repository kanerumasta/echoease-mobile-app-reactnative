import { z } from "zod"
import { ChatSchema } from "../../schemas/chat-schemas"
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useRouter } from "expo-router"


type ChatListItemProps = {
    chat:z.infer<typeof ChatSchema>
}

export const ChatListItem = ({chat}:ChatListItemProps) => {
    const router = useRouter()

    return <TouchableOpacity onPress={()=>router.push(`/messages/${chat.code}`)} style={styles.mainContainer}>
        <Image source={{uri:chat.partner?.profile?.profile_image}} style={{
            width:50,
            borderRadius:25,
            height:50
        }}/>
        <View style={{
            flex:1
        }}>
            <View
                style={{

                    flex:1,
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-between',

                }}
            >
                <Text style={styles.name}>{chat.partner.fullname}</Text>
                <Text style={{
                    fontSize:12,
                    fontWeight:'bold',
                    color:'rgba(0,0,0,0.3)'
                }}>{chat.last_message_time}</Text>
            </View>
        <Text
            style={{
                fontSize:12,
                color:'rgba(0,0,0,0.4)',
                marginTop:5
            }}
        >{chat.last_message.slice(0,30)}{chat.last_message.length > 30 && "..."}</Text>
        </View>
    </TouchableOpacity>
}
const styles = StyleSheet.create({
    mainContainer:{
        elevation:3,
        padding:20,
        backgroundColor:"#fff",
        margin:10,
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        gap:6
    },
    name:{
        fontSize:16,
        fontWeight:'600'
    }
})
