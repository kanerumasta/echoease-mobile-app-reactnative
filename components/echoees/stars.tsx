import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"

export const Stars = ({rating, size=15}:{rating:number, size?:number})=>{
    const wholeStarCount = Math.floor(rating)

    return <View style={styles.container}>
        {Array.from({length: wholeStarCount}, (_, index) => (
            <Ionicons size={size} key={index} name="star" color={"orange"}/>
        ))}

    </View>
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding:2

    }
})
