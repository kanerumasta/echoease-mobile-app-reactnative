import { View, Text } from 'react-native'
import React from 'react'
import { useFetchCompletedBookingsQuery } from '@/redux/features/bookingApiSlice'
import BookingCard from '@/components/bookings/BookingCard'

const completed = () => {
    const {data:bookings=[]} = useFetchCompletedBookingsQuery()
  return (
    <View>
      {
        bookings.map((booking)=>(
            <BookingCard booking={booking}/>
        ))
      }
    </View>
  )
}

export default completed
