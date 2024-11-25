import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useFetchArtistConnectionsQuery } from '@/redux/features/artistApiSlice'
import { z } from 'zod'
import { ArtistInSchema } from '@/schemas/artist-schemas'
import { useRouter } from 'expo-router'

const LimitedConnections = ({artistId}:{artistId:number}) => {
    const {data} = useFetchArtistConnectionsQuery(artistId)
  return (
    <View>
      <View style={styles.listContainer}>
        {data?.connections.slice(0,6).map((connection)=>(
            <Card key={connection.id} artist={connection}/>
        ))}
      </View>
    </View>
  )
}

export default LimitedConnections

const Card = ({artist}:{artist:z.infer<typeof ArtistInSchema>}) =>{
    const router = useRouter()
    return(
        <TouchableOpacity onPress={()=>router.push(`/echoees/${artist.id}`)} style={styles.card}>
            <Image style={styles.image} source={{uri:`${process.env.EXPO_PUBLIC_BACKEND_URL}${artist.user.profile.profile_image}`}}/>
            <Text style={styles.name}>{artist.user.fullname}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image:{
        width:80,
        height:80,
        marginBottom:5,
        borderRadius:10

    },
    card:{
        alignItems:'center'
    },
    listContainer:{
        flexDirection:'row',
        marginTop:10,
        gap:6,

    },
    name:{
        fontWeight:'bold',
        fontSize:12,
        textAlign:'center'
    }
})
