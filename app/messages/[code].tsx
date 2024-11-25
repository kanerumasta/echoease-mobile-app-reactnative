import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Dialog from 'react-native-dialog';
import { Button, Menu, Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { ChatBubble } from "../../components/messages/ChatBubble";
import { MessageInput } from "../../components/messages/MessageInput";
import { useChatWebSocket } from "../../hooks/use-chat-websocket";
import { useGetUserQuery } from "../../redux/features/authApiSlice";
import { useDeleteConversationMutation, useFetchChatByCodeQuery, useFetchConversationDetailQuery } from "../../redux/features/chatApiSlice";
import { MessageSchema } from "../../schemas/chat-schemas";



export default function ConversationPage() {
    const router = useRouter()

    const [page, setPage] = useState(1)
    const { code } = useLocalSearchParams<{code:string}>()
    const [allMessages, setAllMessages] = useState<z.infer<typeof MessageSchema>[]>([])

    const {data:currentUser} = useGetUserQuery()

    const {data:chat} = useFetchConversationDetailQuery(code)
    const {data:conversation, isLoading, isFetching} = useFetchChatByCodeQuery({code:code, page:page},{
        refetchOnMountOrArgChange: true,
    })
    const [deleteConversation,{isLoading:isDeleting}] = useDeleteConversationMutation()
    const [openMenu, setOpenMenu] = useState(false)
    const [deleteModalOpen, setDeleteModalOpen] = useState(false)

    const socketUrl = process.env.EXPO_PUBLIC_CHAT_SOCKET
    if(!socketUrl){
        throw new Error('Missing CHAT_SOCKET environment variable')
    }
    const websocketURL = `${socketUrl}/${code}`;
    const {newMessage, setNewMessage, sendMessage } = useChatWebSocket(
      code,
      websocketURL,
      setAllMessages,
    );
    useEffect(() => {
        if (conversation) {
            // Filter out duplicate messages based on `id`
            const newMessages = conversation.messages.filter(
                (item) => !allMessages.some((msg) => msg.id === item.id)
            ).toReversed(); // Reverse the order if needed

            // Append only unique messages to `allMessages`
            setAllMessages((prev) => [...prev, ...newMessages]);
        }
    }, [conversation]);

    // Function to handle when the user reaches the top to load more messages
    const loadMoreMessages = () => {
        if (conversation && conversation.has_next && !isLoading && !isFetching) {
            setPage(prevPage => prevPage + 1); // Increment the page number to fetch older messages
        }
    };

    const handleSend = () => {
        sendMessage();
        setNewMessage('')
    }

    const handleDeleteConvo = async () => {
        await deleteConversation(code).unwrap()
        .then(()=>{
            Toast.show({
                text1:'Conversation deleted successfully',
                type: 'success',
                visibilityTime:3000
            })
            router.back()
        })
        .catch(()=>{
            Toast.show({
                text1: 'Failed to delete conversation',
                type:'error',
                visibilityTime: 3000
            })
        }).finally(()=>{
            setDeleteModalOpen(false);
            setOpenMenu(false)
        })
    }



    return (
        <PaperProvider>
        <SafeAreaView style={styles.container}>
            {chat && currentUser && <>
            {/* HEADER */}
            <View style={styles.header}>

                <Ionicons name="chevron-back"
                    onPress={()=>router.back()}
                    size={24}
                    color="dodgerblue"
                    style={{
                    padding:10,
                }}/>
                <Image source={{uri:chat.partner.profile.profile_image}} style={{
                    width:50,
                    height:50,
                    borderRadius: 25,
                    resizeMode: 'cover'
                }}/>
                <Text style={styles.headerText}>{chat.partner?.fullname}</Text>
                <View style={{flex:1,alignItems:'flex-end'}}>
                <Menu
                    visible={openMenu}
                    mode="elevated"
                    anchorPosition="bottom"

                    onDismiss={()=>setOpenMenu(false)}
                    anchor={
                        <Ionicons name="ellipsis-vertical-sharp" size={20} onPress={()=>setOpenMenu(!openMenu)}/>
                    }
                >

                    <Menu.Item onPress={() => setDeleteModalOpen(true)} title="Delete Conversation" />
                    <Menu.Item onPress={() => console.log("Option 2 selected")} title="Block User" />

                </Menu>
                </View>
                {/* Delete COnfirm Dialog */}
                <Dialog.Container visible={deleteModalOpen}>
                    <Dialog.Title style={{color:"#f31260", fontWeight:'bold'}}>Delete Conversation</Dialog.Title>
                    <Dialog.Description>Are you sure you want to delete this conversation? This action cannot be undone.</Dialog.Description>
                    <Dialog.Button
                        disabled={isDeleting}
                        style={{
                            backgroundColor:'#f31260',
                            color:'#fff',
                            borderRadius:5}}
                            label={isDeleting?"Deleting":"Delete"}
                            onPress={handleDeleteConvo} />
                    <Dialog.Button
                        style={{
                            backgroundColor:'rgba(0,0,0,0.4)',
                            marginLeft:5,
                            color:'#fff',
                            borderRadius:5}}
                        label="Cancel"
                        onPress={()=>setDeleteModalOpen(false)} />
                </Dialog.Container>

            </View>

            {/* BODY */}
            <View style={styles.body}>

            <FlatList
                            data={allMessages}
                            renderItem={({item})=>(<ChatBubble isUser={item.author === currentUser.email} message={item}/>)}
                            keyExtractor={(item) => item.id.toString()}
                            inverted
                            onEndReached={()=>{loadMoreMessages()}}
                            ListFooterComponent={
                                (isFetching || isLoading) ? <ActivityIndicator size={30} /> :
                                null
                            }
                            showsVerticalScrollIndicator={false}

                    />
            </View>

            {/* MESSAGE INPUT */}
            <MessageInput message={newMessage} setMessage={setNewMessage} onSend={handleSend}/>
            </>
}
        </SafeAreaView>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding:20,
        backgroundColor:"#f4f6f5",
        borderBottomWidth:0.2,
        borderColor:"rgba(0,0,0,0.5)",
        marginTop:20,
        paddingHorizontal:6,
        alignItems: 'center',
        flexDirection:'row',
        gap:6

    },
    headerText: {
        color: '#000',
        fontSize: 20,

    },
    body: {
        flex: 1,
        padding: 10,
        borderTopWidth: 0,
        backgroundColor:'#f4f6f5'
    },
    scrollViewContent: {
        paddingBottom: 60,
    },
})
