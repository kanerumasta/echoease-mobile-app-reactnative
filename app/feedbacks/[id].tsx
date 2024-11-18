import { Feedbacks } from "@/components/echoees/feedbacks";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function EchoeeFeedbacks(){
    const {id} = useLocalSearchParams<{id:string}>()
    return <View>
        <Feedbacks artistId={parseInt(id)}/>
    </View>
}
