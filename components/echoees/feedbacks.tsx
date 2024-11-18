import { useFetchArtistFeedbacksQuery } from "@/redux/features/reviewsApiSlice"
import { FeedbacksInSchema } from "@/schemas/review-schemas"
import { useState } from "react"
import { Dimensions, FlatList, Image, StyleSheet, Text, View } from "react-native"
import { z } from "zod"
import { Stars } from "./stars"

export const Feedbacks = ({artistId}:{artistId:number}) => {
    const [page, setPage] = useState(1)
    const {data, isLoading, isFetching} = useFetchArtistFeedbacksQuery({
        page,
        artistId
    })

    const handleNextPage = () => {
        if(data?.has_next && !isLoading && !isFetching){
            setPage(prev => prev+1)
        }
    }
    const handleBackPage = () => {
        if(page > 1 && !isFetching && !isLoading){
            setPage(prev => prev-1)
        }
    }

    return <View>
        <FlatList
            data={data?.results}
            renderItem={({item})=>(
                <FeedbackCard feedbackItem={item}/>
            )}
            keyExtractor={item => item.id.toString()}
            onEndReached={handleNextPage}
            onStartReachedThreshold={3}
            onEndReachedThreshold={2}
            onStartReached={handleBackPage}
            ListEmptyComponent={<View style={styles.emptyFeedbackContainer}>
                <Text style={{color:'rgba(0,0,0,0.5)',fontSize:18, fontWeight:'bold', textAlign:'center'}}>No feedbacks yet</Text>
            </View>}
        />
    </View>


}

const FeedbackCard = ({feedbackItem}:{feedbackItem:z.infer<typeof FeedbacksInSchema>}) =>{
    return <View style={styles.cardContainer}>
        <View style={styles.topContainer}>
            <Image style={styles.cardImage} source={{uri:`${process.env.BACKEND_URL}${feedbackItem.client.profile.profile_image}`}}/>
            <View>
            <Text style={styles.fullname}>{feedbackItem.client.fullname}</Text>
            <Stars rating={feedbackItem.rating}/>
            </View>
        </View>
        <View>
        <Text style={styles.comment}>{feedbackItem.feedback}</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    topContainer:{
        flexDirection:'row',
        gap:4,
        marginBottom:5
    },
    cardContainer:{
        padding:10,
        elevation:4,
        backgroundColor:'#fff',
        marginHorizontal:10,
        marginVertical:5,
        borderRadius:8
    },
    cardImage:{
        width:50,
        height:50,
        borderRadius:25,
        resizeMode:'cover'
    },
    fullname:{
        fontWeight:'bold',
        marginBottom:3
    },
    comment:{
        color:'rgba(0,0,0,0.6)'
    },
    emptyFeedbackContainer:{
        height:Dimensions.get('window').height,
        backgroundColor:'#f9f9f9',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:20
    }
})
