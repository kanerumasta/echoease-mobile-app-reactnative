import { Ionicons } from "@expo/vector-icons";
import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { EchoeeGroup } from "../../components/echoees/echoee-group";
import { useFetchArtistsWithFilterQuery } from "@/redux/features/artistApiSlice";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useGetUserQuery } from "@/redux/features/authApiSlice";

export default function EchoeesPage(){
    const [refresh, setRefresh] = useState(1)

    const [searchText, setSearchText] = useState()
    const handleRefresh = () => {
        setRefresh(prev=>prev+1)
    }
    return<>
<View style={{backgroundColor:'rgba(0,0,0,0.8)', height:50}}>

</View>


    <ScrollView style={styles.mainContainer} refreshControl={ <RefreshControl refreshing={false} onRefresh={handleRefresh} />}>
        <View style={{
            paddingHorizontal:10,
            marginBottom:15,

        }}>
             <Header />

            <View
                style={{
                    backgroundColor:'#fff',
                    borderRadius:30,

                    flexDirection:'row',
                    alignItems:'center',
                    padding:10,
                    gap:4
                }}
            >
                <Ionicons size={20} color={'rgba(0,0,0,0.4)'} name="search"/>
                <TextInput placeholderTextColor={'rgba(0,0,0,0.4)'} style={{
                    flex:1,
                    marginRight:15,
                }} placeholder="Search Echoee"/>
            </View>

        </View>

        <EchoeeGroup refresh={refresh} category="near" title="Echoees Near You"/>
        <EchoeeGroup refresh={refresh} category="new" title="Fresh Voices"/>
        <EchoeeGroup refresh={refresh} category="versatile" title="Versatile Performers"/>
    </ScrollView>

    </>
}
const Header = () => {
    const {data:currentUser} = useGetUserQuery()
    const router = useRouter()
    return <View style={{  backgroundColor:'transparent', justifyContent:'center', paddingBottom:30}}>
        <Ionicons onPress={()=>router.back()} color={"rgba(255,255,255,0.6)"} style={{
            paddingVertical:10,

        }} name="chevron-back" size={30}/>
        <Text style={{
            fontSize:30,
            color:'#fff',
            paddingHorizontal:10,
            fontWeight:'bold',
            marginBottom:8,
            textTransform:'capitalize',

        }}>Hello {currentUser && currentUser.role === 'artist' ? 'echoee' :'echoer'}</Text>
        <Text style={{
            color:'rgba(255,255,255,0.6)',

            paddingHorizontal:10,
            fontStyle:'italic',
            fontSize:16

        }}>Welcome to the soundtage</Text>
    </View>
}


const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'rgba(0,0,0,0.8)',
        height: '100%',

    },
    scrollView:{
        display:'flex',
        flexDirection:'row',
        gap:6
    }
})
