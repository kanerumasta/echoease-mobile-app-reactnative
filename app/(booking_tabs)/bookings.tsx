import { View, Text, FlatList, StyleSheet, RefreshControl, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { useFetchMyBookingsQuery } from '@/redux/features/bookingApiSlice'
import {DataTable} from 'react-native-paper'
import BookingCard from '@/components/bookings/BookingCard'
import { LinearGradient } from 'expo-linear-gradient'



const Bookings = () => {

    const [page, setPage] = useState(1)

    const [filters, setFilters] = useState({
        page:page,
        sort_by: null,
        sort_order: null,
        status: null,
        paginate: true,
        q: null,
    })
    // { page: number; sort_by: string | null; sort_order: string | null; status: string | null; paginate: boolean; q: string | null; }

    const {data:bookingsData, refetch, isLoading} = useFetchMyBookingsQuery(filters)

    const handleRefresh = () => {
        setPage(1)
        setFilters({...filters, page:1})
        refetch()
    }


  return (
<LinearGradient
    colors={['#4aacfb','#00effd']}

>
    {bookingsData &&
    <FlatList  contentContainerStyle={{minHeight:Dimensions.get('window').height - 100, paddingBottom:30 }} style={styles.flatList} data={bookingsData.results} renderItem={({item})=>(
        <>
        <BookingCard booking={item}/>

        </>
    )}
    refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
    }
    showsVerticalScrollIndicator={false}
    />
}
</LinearGradient>

  )
}

export default Bookings


const styles = StyleSheet.create({
    flatList:{
        paddingTop:20,
    },
})
