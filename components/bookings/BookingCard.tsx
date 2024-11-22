import { useGetUserQuery } from '@/redux/features/authApiSlice'
import { useConfirmBookingMutation, useRejectBookingMutation } from '@/redux/features/bookingApiSlice'
import { useCreateInvoiceMutation } from '@/redux/features/paymentApiSlice'
import { BookInSchema } from '@/schemas/booking-schemas'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { z } from 'zod'

const BookingCard = ({booking}:{booking:z.infer<typeof BookInSchema>}) => {
    const {data:currentUser} = useGetUserQuery()
    const router = useRouter()


    const statusBackColor = booking.status === 'pending' ? '#e6c77a' : booking.status === 'completed' ? '#17c964' : booking.status === 'rejected' ? '#f31260' : booking.status === 'approved' ? "#9353d3" : booking.status === 'awaiting_downpayment'? "#006fee" : "#3f3f46"



  return (
    <TouchableOpacity onPress={()=>router.push(`/bookings/${booking.id.toString()}`)} style={styles.mainContainer}>
        {currentUser && currentUser.role === 'artist' ?
        <Image style={styles.image} source={{uri:`${process.env.EXPO_PUBLIC_BACKEND_URL}${booking.client.profile.profile_image}`}}/> : <Image style={styles.image} source={{uri:`${process.env.EXPO_PUBLIC_BACKEND_URL}${booking.artist.user.profile.profile_image}`}}/>}
        <View style={{
            flex:1
        }}>
            <View style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                gap:4
            }}>

            {currentUser && <Text style={styles.artistName}>{currentUser.role === 'artist' ? booking.client.fullname : booking.artist.user.fullname}</Text>}
            <Text style={styles.price}>{'\u20B1'}{parseInt(booking.amount)}</Text>
            </View>
            <Text style={[styles.description,{color:"#000", fontWeight:'bold'}]}>{booking.event_name}</Text>
            <Text style={styles.description}>{booking.formatted_event_date}</Text>
            <Text style={styles.description}>{booking.formatted_start_time}-{booking.formatted_end_time}</Text>
            <Text style={styles.description}>{booking.venue || 'null'}</Text>
            <Text style={[{
                backgroundColor:statusBackColor,
                color:(booking.status === 'awaiting_downpayment') || (booking.status === 'approved') || (booking.status === 'rejected') ? "#fff":'#000'
            },styles.status]}>{booking.status.split('_').join(" ")}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    mainContainer : {
        backgroundColor:"#fff",
        padding:20,
        borderRadius:10,
        marginBottom:10,
        elevation:4,
        flexDirection:'row',
        marginHorizontal:10,
        gap:8,
        borderBottomRightRadius:40,
        borderTopLeftRadius:40
    },
    artistName:{
        fontSize:16,
        fontWeight:'bold',
        flex:1,
         color:'dodgerblue'
    },
    image:{
        width:100,
        height:100,
        borderRadius:15,
        borderTopLeftRadius:20
    },
    description:{
        fontSize:12,
        color:'rgba(0,0,0,0.4)',
        textTransform:'capitalize'
    },
    price:{
        fontSize:18,
        fontWeight:'bold',


    },
    status:{
        width:90,
        textAlign:'center',
        padding:4,
        marginTop:4,
        borderRadius:30,
        textTransform:'capitalize',
        fontSize:10,
        fontWeight:'bold',
        display:'flex'

    },
    modalContainer:{
        backgroundColor:'#fff',
        minHeight:Dimensions.get('window').height,

    },
    modalContent:{
        backgroundColor:'red',
        height:200
    }
})

export default BookingCard
