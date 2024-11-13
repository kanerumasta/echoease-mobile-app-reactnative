import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { z } from 'zod'
import { BookingSchema, BookInSchema } from '@/schemas/booking-schemas'

const BookingCard = ({booking}:{booking:z.infer<typeof BookInSchema>}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.eventName}>{booking.event_name}</Text>

    </View>
  )
}
const styles = StyleSheet.create({
    mainContainer : {
        backgroundColor:"#fff",
        padding:20,
        borderRadius:10,
        marginBottom:10,
        elevation:4
    },
    eventName:{
        fontSize:20,
        fontWeight:'bold'
    }
})

export default BookingCard
