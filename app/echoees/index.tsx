import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { EchoeeGroup } from "../../components/echoees/echoee-group";

export default function EchoeesPage(){
    return<>
    <Header />

    <ScrollView style={styles.mainContainer}>
        <View style={{
            paddingHorizontal:10,
            marginBottom:15
        }}>
            <View
                style={{
                    backgroundColor:'#fff',
                    borderRadius:30,
                    width:250,
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
        <EchoeeGroup category="near" title="Echoees Near You"/>
        <EchoeeGroup category="new" title="Fresh Voices"/>
        <EchoeeGroup category="versatile" title="Versatile Performers"/>
    </ScrollView>

    </>
}
const Header = () => {
    return <View style={{  backgroundColor:'rgba(0,0,0,0.8)', justifyContent:'center',height:80, alignItems:'center'}}>
        <Text>Header</Text>
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
