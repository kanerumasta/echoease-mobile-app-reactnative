import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { useFetchFollowersQuery, useFetchFollowingQuery } from '@/redux/features/artistApiSlice'
import { useRouter } from 'expo-router'

const FollowersDisplayCard = ({ artistId}:{ artistId:string}) => {
    const {data:followers=[]} = useFetchFollowersQuery(parseInt(artistId))
    const {data:following=[]} = useFetchFollowingQuery(parseInt(artistId))
    const router = useRouter()
  return (
    <TouchableOpacity onPress={()=>router.push(`/followers/${artistId}`)} style={styles.container}>
        <Card count={followers.length} label='Followers'/>
        <Card count={following.length} label='Following'/>

    </TouchableOpacity>
  )
}

export default FollowersDisplayCard

const Card = ({count,label}:{count:number, label:string}) => {
    return  <View style={styles.card}>
    <Text style={styles.countText}>{count}</Text>
    <Text style={{
        fontSize:12,
        color:'rgba(0,0,0,0.4)'
    }}>{label}</Text>
</View>
}

const styles = StyleSheet.create({
    container:{
        zIndex:100,
        backgroundColor:'rgba(255,255,255,0.5)',

        justifyContent: 'center',
        borderRadius:10,

        alignItems:'center',
        flexDirection:'row',
        gap:12,

    },
    card:{
        alignItems:'center'
    },
    countText:{
        fontSize:50,
        fontWeight:'bold',
        color:'#4b4cff'
    }
})
