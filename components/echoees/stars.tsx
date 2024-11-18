import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, View } from "react-native"

export const Stars = ({rating}:{rating:number})=>{
    const wholeStarCount = Math.floor(rating)
    const halfStarCount = rating - wholeStarCount //add logic for has point starts

    return <View style={styles.container}>
        {Array.from({length: wholeStarCount}, (_, index) => (
            <Ionicons name="star" color={"orange"}/>
        ))}

    </View>
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        padding:2

    }
})
