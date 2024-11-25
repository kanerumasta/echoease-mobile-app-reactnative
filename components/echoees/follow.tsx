import { useFollowArtistMutation, useUnfollowArtistMutation } from "@/redux/features/artistApiSlice";
import { useGetUserQuery } from "@/redux/features/authApiSlice";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { z } from "zod";

export const Follow = ({artist, refetch}:{artist:z.infer<typeof ArtistInSchema>, refetch:()=>void}) => {
    const {data: currentUser} = useGetUserQuery()
    const [follow] = useFollowArtistMutation()
    const [unfollow] = useUnfollowArtistMutation()


    const handleFollow = async () => {
        const payload = {
            artist:artist.id
        }
        await follow(payload).unwrap()
        refetch()
    }

    const handleUnFollow = async () => {
        const payload = {
            artist:artist.id
        }
        await unfollow(payload).unwrap()
        refetch()
    }



    return <>
    {currentUser && !artist.followers.includes(currentUser.id) ?
        <TouchableOpacity style={styles.button} onPress={handleFollow}>
            <Text style={styles.text}>Follow</Text>
        </TouchableOpacity> :
        <TouchableOpacity style={[styles.button,{backgroundColor:'rgba(0,0,0,0.4)'}]} onPress={handleUnFollow}>
            <Text  style={styles.text}>Unfollow</Text>
        </TouchableOpacity>
}
    </>
}

const styles = StyleSheet.create({
    button:{
        alignItems:'center',
        justifyContent: 'center',
        padding:6,
        backgroundColor:"dodgerblue",
        borderRadius:20,
        marginRight:10
    },
    text:{
        color:'#fff',
        fontSize:14
    }
})
