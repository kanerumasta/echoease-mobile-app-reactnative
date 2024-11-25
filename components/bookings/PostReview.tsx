import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { z } from 'zod'
import { BookInSchema } from '@/schemas/booking-schemas'
import { usePostAReviewMutation } from '@/redux/features/reviewsApiSlice'
import Toast from 'react-native-toast-message'
import { ActivityIndicator } from 'react-native-paper'

const PostReview = ({booking, onSuccessReview}:{booking:z.infer<typeof BookInSchema>, onSuccessReview:()=>void}) => {
    const [starCount, setStarCount] = React.useState(0)
    const [openModal, setOpenModal] = React.useState(false)
    const [post,{isLoading}] = usePostAReviewMutation()
    const [feedback, setFeedback] = useState("")


    const handlePost = async () => {
            await post({
                booking:booking.id,
                rating:starCount,
                client_id:booking.client.id,
                feedback:feedback
            }).unwrap()
            .then(()=>{
                Toast.show({
                    text1: 'Review posted successfully',
                    type:'success',
                    visibilityTime: 3000,
                })
                setFeedback("")
                setStarCount(0)
                setOpenModal(false)
                onSuccessReview()
            })
            .catch(()=>{
                Toast.show({
                    text1: 'Failed to post review',
                    type:'error',
                    visibilityTime: 3000,
                })
            })
    }

    const handleCancel = () => {
        setFeedback("")
        setStarCount(0)

        setOpenModal(false)
    }


  return (
   <>
    <TouchableOpacity style={styles.triggerButton} onPress={()=>setOpenModal(true)}>
        <Ionicons size={20} name='star' color={"#000"}/>
        <Text style={styles.triggerText}>Post A Review</Text>
    </TouchableOpacity>
    <Modal style={{position:'relative'}} visible={openModal} animationType='slide'>
        <TouchableOpacity style={{ position:'absolute', top:2, right:2}} onPress={()=>setOpenModal(false)}>
            <Ionicons size={30}  name="close-circle" />
        </TouchableOpacity>
        <View>
            <View style={styles.greetingsContainer}>
                <Text style={styles.greetingsTitle}>Rate Your Booking with {booking.artist.user.fullname}</Text>
                <Text style={styles.greetingsDescription}>Tell us about your experience working with {booking.artist.user.fullname}. Your insights help us celebrate great performances and improve our platform for everyone. Leave your feedback today!</Text>
            </View>
            <StarsPicker starCount={starCount} setStarCount={(starCount) => setStarCount(starCount)} />
            <View style={styles.feedbackContainer}>
                <TextInput onChangeText={setFeedback} placeholder='Type you feedback here...' maxLength={250} style={styles.input} multiline/>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleCancel} style={styles.button}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePost} style={[styles.button,{backgroundColor:'gold'}]}>
                    <Text style={[styles.buttonText,{color:"#000"}]}>{isLoading && <ActivityIndicator color='white'/>} {isLoading ? "Loading" : "Submit"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
   </>
  )
}

export default PostReview



type StarPickerProps = {
    starCount:number,
    setStarCount:Dispatch<SetStateAction<number>>
}

const StarsPicker = ({starCount,setStarCount}:StarPickerProps) => {
    return <View style={styles.starsContainer

    }>
        {Array.from({length: 5}, (_, index) => (
            <Pressable key={index} onPress={() => setStarCount(index + 1)}>
                <Ionicons size={60} color={starCount >= index+1 ? "gold" : "gray"} name="star" />
            </Pressable>
        ))}
    </View>
}

const styles = StyleSheet.create({
    triggerButton:{
        backgroundColor:'gold',
        color:'#000',
        padding:15,
        borderRadius:10,
        elevation:4,
        marginLeft:20,
        flexDirection:'row',
        alignItems:'center',
        gap:4
    },
    triggerText:{
        fontSize:14,
        fontWeight:'bold'

    },
    starsContainer:{
        flexDirection:'row',
        gap:10,
        justifyContent: 'center',
        marginBottom:20
    },
    input:{
        fontSize:18,
    },
    feedbackContainer:{
        padding:10,
        backgroundColor:'#fff',
        marginHorizontal:10,
        borderRadius:10,
        minHeight:200,
        borderWidth:2,
        borderColor:'gold'
    },
    buttonContainer:{
        flexDirection:'row',
        gap:10,
        paddingHorizontal:10,
        marginTop:15

    },
    button:{
        padding:15,
        backgroundColor:'gray',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10,
        elevation:4

    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff'
    },
    greetingsContainer:{
        padding:10
    },
    greetingsTitle:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:8,
        marginTop:30
    },
    greetingsDescription:{
        color:'rgba(0,0,0,0.5)',
        marginBottom:12,
        lineHeight:25
    }
})
