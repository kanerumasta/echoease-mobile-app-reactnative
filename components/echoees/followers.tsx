import { useFetchFollowersQuery, useFetchFollowingQuery } from "@/redux/features/artistApiSlice"
import { useRouter } from "expo-router"
import { useState } from "react"
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native"
import UserCard from "./userCard"

export const Followers = ({artistId}:{artistId:number}) => {

    const {data:followers} = useFetchFollowersQuery(artistId,{refetchOnMountOrArgChange:true})
    const router = useRouter()

    const redirect = () => {
        router.push(`/echoees/${artistId}`)
    }

    return<View>

        <FlatList
            data={followers}
            renderItem={({item})=>(
                <TouchableOpacity>
                    <UserCard imageSrc={`${item.profile.profile_image}`} user={item}/>
                </TouchableOpacity>
            )}
        />
    </View>
}
