import { Ionicons } from "@expo/vector-icons";
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { useFetchChatsQuery } from "../../redux/features/chatApiSlice";
import { ChatListItem } from "../../components/messages/ChatListItem";
import { useRouter } from "expo-router";

export default function ChatListPage (){
    const {data:chats} = useFetchChatsQuery()
    return <SafeAreaView>
        <Header />
        <View>
            {chats && <FlatList
                data={chats}
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
            <SearchInput />
        </View>
        <Text style={styles.headerTitle}>Messages</Text>
    </View>
}

const SearchInput = ()=> {
    return <View style={styles.searchContainer}>
        <Ionicons color={'rgba(0,0,0,0.4)'} size={20} style={{paddingHorizontal:10, paddingVertical:10}} name="search"/>
        <TextInput placeholderTextColor={'rgba(0,0,0,0.3)'} placeholder="Search" style={styles.searchInput}/>
    </View>
}

const styles = StyleSheet.create({
    header:{
        padding:20
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
        alignItems:'center'
    },
    searchInput : {
        padding:10,
    }

})
