import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { z } from 'zod'
import { ArtistInSchema, GenreSchema } from '@/schemas/artist-schemas'

const GenreList = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) => {
  return (
    <View>
      <Text style={styles.headerTitle}>Genres</Text>
      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.mainContainer}
      nestedScrollEnabled={true}
      keyExtractor={genre => genre.id.toString()}
        data={artist.genres}
        renderItem={({item})=>(
            <GenreItem genre={item}/>
        )}
      />
    </View>
  )
}

export default GenreList

const GenreItem = ({genre}:{genre:z.infer<typeof GenreSchema>}) => {
    return <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{genre.name}</Text>
    </View>
}

const styles = StyleSheet.create({
    headerTitle:{
        fontSize:18,
        fontWeight:'bold',
        color:'rgba(0,0,0,0.4)',
        marginBottom:10
    },
    mainContainer:{
        flexDirection:'row',
        gap:10,
        marginBottom:12,

    },

    itemContainer:{
        backgroundColor: "rgba(128, 0, 128, 0.5)",
        padding:10,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
    },
    itemText:{
        fontSize:12,
        fontWeight:'bold',
        color:'#fff',
        textTransform:'uppercase',

    },


})
