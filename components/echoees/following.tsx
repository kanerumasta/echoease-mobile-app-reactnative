import { useFetchFollowersQuery, useFetchFollowingQuery } from "@/redux/features/artistApiSlice"
import { useRouter } from "expo-router"
import { useState } from "react"
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native"
import UserCard from "./userCard"

export const Following = ({artistId}:{artistId:string}) => {

    const {data:following} = useFetchFollowingQuery(parseInt(artistId),{refetchOnMountOrArgChange:true})
    const router = useRouter()
    return<View>
        <FlatList
            data={following}
            renderItem={({item})=>(

                    <UserCard  imageSrc={`${process.env.EXPO_PUBLIC_BACKEND_URL}${item.user.profile.profile_image}`} user={item.user}/>

            )}
        />
    </View>
}
