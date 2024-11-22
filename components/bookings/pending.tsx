import { View, Text, FlatList, RefreshControl, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import {  useFetchPendingBookingsQuery } from '@/redux/features/bookingApiSlice'
import BookingCard from '@/components/bookings/BookingCard'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'


export const Pending = () => {
    const {data:bookings=[],isLoading, refetch} = useFetchPendingBookingsQuery()
    const handleRefresh = () => {
        refetch()
    }
    console.log(bookings.length)

    return (
        <View
    >
            <FlatList  contentContainerStyle={{minHeight:Dimensions.get('window').height - 100, paddingBottom:30}} style={{paddingTop:20}} data={bookings} renderItem={(item)=>(
                <BookingCard booking={item.item}/>
            )}
                ListEmptyComponent={!isLoading ?
                    <View style={styles.empty}>

                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color:'rgba(0,0,0,0.2)'
                        }}>No Pending Bookings</Text>
                    </View> :null}
                refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}
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
