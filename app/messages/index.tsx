import { Ionicons } from "@expo/vector-icons";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useFetchChatsQuery } from "../../redux/features/chatApiSlice";
import { ChatListItem } from "../../components/messages/ChatListItem";
import { useRouter } from "expo-router";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { z } from "zod";
import { ChatSchema } from "@/schemas/chat-schemas";

export default function ChatListPage (){
    const {data:chats, refetch} = useFetchChatsQuery(undefined, {refetchOnMountOrArgChange:true})
    const [searchText, setSearchText] = useState("")

    const [filteredChats, setFilteredChats] = useState<z.infer<typeof ChatSchema>[]>()


     useFocusEffect(
        React.useCallback(() => {
            refetch();
        }, [refetch])
    );

    useEffect(() => {
        if (searchText) {
          const filtered = chats?.filter((chat) =>
            chat.partner.fullname.toLowerCase().includes(searchText.toLowerCase())
          );
          setFilteredChats(filtered);
        } else {
          setFilteredChats(chats);
        }
      }, [searchText, chats]);

    return <SafeAreaView>
        <Header />
        <SearchInput searchText={searchText} setSearchText={setSearchText}/>
        <View>
            {chats && <FlatList
                data={filteredChats}
                renderItem={({item})=>(
                    <ChatListItem chat={item}/>
                )}

            />}
        </View>

    </SafeAreaView>
}

const Header = () => {
    const router = useRouter()
    return <View style={styles.header}>
        <View style={{

        }}>
            <Ionicons
                onPress={()=>router.back()}
                size={30}
                color={"dodgerblue"}
                style={{
                paddingVertical:10

                }} name="chevron-back"/>

        </View>
        <Text style={styles.headerTitle}>Messages</Text>
    </View>
}

const SearchInput = ({searchText, setSearchText}:{searchText:string,setSearchText:Dispatch<SetStateAction<string>>})=> {
    return <View style={styles.searchContainer}>
        <Ionicons color={'rgba(0,0,0,0.4)'} size={20} style={{paddingHorizontal:10, paddingVertical:10}} name="search"/>
        <TextInput onChangeText={setSearchText} value={searchText} placeholderTextColor={'rgba(0,0,0,0.3)'} placeholder="Search" style={styles.searchInput}/>
    </View>
}

const styles = StyleSheet.create({
    header:{
        padding:20,
        paddingTop:40
    },
    headerTitle:{
        fontSize:25,
        fontWeight:'bold'
    },
    searchContainer : {
        elevation:4,
        borderRadius:30,
        backgroundColor:"#fff",
        marginBottom:20,
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10
    },
    searchInput : {
        padding:10,
    }

})
