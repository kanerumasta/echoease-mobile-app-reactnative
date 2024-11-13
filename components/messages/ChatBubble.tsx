import { StyleSheet, Text, View } from "react-native"
import { z } from "zod"
import { MessageSchema } from "../../schemas/chat-schemas"

type ChatBubbleProps = {
    message: z.infer<typeof MessageSchema>,
    isUser?: boolean
}

export const ChatBubble = ({ message, isUser }: ChatBubbleProps) => {

    const date = new Date(message.created_at)

    return (

        <View
            style={[
                styles.mainContainer,
                {
                    backgroundColor: isUser ? 'dodgerblue' : 'rgba(0,0,0,0.4)',
                    marginLeft: isUser ? 0 : 10,
                    alignSelf: isUser ? 'flex-end' : 'flex-start',
                }
            ]}
        >
            <Text style={styles.text}>{message.content}</Text>


            <Text
            style={styles.timestamp}
            >{`${date.getHours()}:${date.getMinutes()} ${date.getHours() > 12 ? 'PM' : 'AM'}  ${date.toLocaleDateString()}`}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: 15,
        padding: 10,
        maxWidth: '60%',
        marginVertical:10
    },
    text: {
        color: '#ffffff',
        fontSize:18
    },
    timestamp: {
        fontSize: 10,
        color: 'rgba(255,255,255,0.5)',
    },
})
