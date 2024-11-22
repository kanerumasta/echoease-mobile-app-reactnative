import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFetchArtistsWithFilterQuery } from '@/redux/features/artistApiSlice'
import { EchoeeCard } from './echoee-card'

const Search = ({searchText}:{searchText:string}) => {
    const {data:echoees} = useFetchArtistsWithFilterQuery({
        q:searchText,
        min_price:null,
        max_price:null,
        genres:[],
        category: null,
        page: 1,
    })
  return (
    <View>
        <Text style={{
            color:'rgba(255,255,255,0.5)',
            paddingHorizontal:10,
            fontSize:20,
            marginBottom:10
        }}>Search results for "{searchText}"</Text>
      <FlatList
       horizontal
       showsHorizontalScrollIndicator={false}
        data={echoees?.results}
        renderItem={({item})=>(
            <EchoeeCard echoee={item}/>
        )}
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})
