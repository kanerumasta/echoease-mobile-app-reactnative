import { View, Text, StyleSheet, Dimensions,FlatList, RefreshControl } from 'react-native'
import React from 'react'
import { useFetchCompletedBookingsQuery } from '@/redux/features/bookingApiSlice'
import BookingCard from '@/components/bookings/BookingCard'
import { LinearGradient } from 'expo-linear-gradient'



export default function Completed () {
    const {data:bookings=[], isLoading, refetch} = useFetchCompletedBookingsQuery()

    const handleRefresh = () => {
        refetch()
    }

  return (
    <View
    style={{
        paddingTop:20
    }}
>
        <FlatList  contentContainerStyle={{minHeight:Dimensions.get('window').height - 100, paddingBottom:30 }} data={bookings} renderItem={({item})=>(
            <BookingCard booking={item}/>
        )}
        ListEmptyComponent={!isLoading ?
            <View style={styles.empty}>

                <Text style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color:'rgba(0,0,0,0.2)'
                }}>No Pending Bookings</Text>
            </View> :null}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh}/>}
        showsVerticalScrollIndicator={false}
        />

    </View>
  )
}



const styles = StyleSheet.create({
    empty:{
        justifyContent: 'center',
        alignItems:'center',
        height: Dimensions.get('window').height - 100
    }
})
