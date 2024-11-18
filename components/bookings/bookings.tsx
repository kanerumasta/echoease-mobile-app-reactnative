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

    const {data:bookingsData, refetch, isLoading} = useFetchMyBookingsQuery(filters,{
        refetchOnMountOrArgChange: true
    })

    const handleRefresh = () => {
        setPage(1)
        setFilters({...filters, page:1})
        refetch()
    }

    const handleNext = () => {

        if(bookingsData?.has_next &&!isLoading){

            setPage(prev => prev+1)
            refetch()
        }
    }
    const handleBack = () => {
        if(bookingsData?.has_next &&!isLoading){
            setPage(prev => prev-1)
        }
    }


  return (
<View
>
    {bookingsData &&
    <FlatList  contentContainerStyle={{minHeight:Dimensions.get('window').height - 100, paddingBottom:30 }}
    style={styles.flatList}
    data={bookingsData.results}
    renderItem={({item})=>(
        <>
        <BookingCard booking={item}/>

        </>
    )}
    refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
    }
    onEndReached={handleNext}
    onStartReached={handleBack}
    showsVerticalScrollIndicator={false}
    />
}
</View>

  )
}

export default Bookings


const styles = StyleSheet.create({
    flatList:{
        paddingTop:20,
    },
})
