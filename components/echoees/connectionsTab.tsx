import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useFetchArtistConnectionsQuery } from '@/redux/features/artistApiSlice'
import UserCard from './userCard'
import { useRouter } from 'expo-router'

const ConnectionsTab = ({artistId}:{artistId:string}) => {
    const {data:connections} = useFetchArtistConnectionsQuery(parseInt(artistId))
    const router = useRouter()
  return (
    <View>
      <FlatList
        nestedScrollEnabled={true}
        data={connections?.connections}
        renderItem={({item})=>(
            <UserCard handleRedirect={()=>router.push(`/echoees/${item.id}`)} imageSrc={`${process.env.EXPO_PUBLIC_BACKEND_URL}${item.user.profile.profile_image}`} user={item.user}/>
        )}
      />
    </View>
  )
}

export default ConnectionsTab

const styles = StyleSheet.create({})
