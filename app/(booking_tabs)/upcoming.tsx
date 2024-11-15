import { View, Text, ActivityIndicator, FlatList, RefreshControl, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import { useFetchUpcomingEventsQuery } from '@/redux/features/bookingApiSlice'
import BookingCard from '@/components/bookings/BookingCard'
import { LinearGradient } from 'expo-linear-gradient'

const UpcomingBookings = () => {
    const {data:bookings=[], isLoading, refetch} = useFetchUpcomingEventsQuery()

    const handleRefresh = () => {
        refetch()
    }

    if(isLoading) return <Loading />
    return (
        <LinearGradient
        colors={['#4aacfb','#00effd']}


    >
            <FlatList contentContainerStyle={{minHeight:Dimensions.get('window').height - 100, paddingBottom:30 }} style={{paddingTop:20}} data={bookings} renderItem={(item)=>(
                <BookingCard booking={item.item}/>
            )}
            refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh}/>}
            ListEmptyComponent={!isLoading ?
                <View style={styles.empty}>

                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color:'rgba(0,0,0,0.2)'
                    }}>No Pending Bookings</Text>
                </View> :null}

showsVerticalScrollIndicator={false}
            />

        </LinearGradient>
    )
}

const Loading = () => {
    return (
        <View style={{height:'100%', justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
        </View>
    )
}

export default UpcomingBookings


const styles = StyleSheet.create({
    empty:{
        justifyContent: 'center',
        alignItems:'center',
        height: Dimensions.get('window').height - 100
    }
})
