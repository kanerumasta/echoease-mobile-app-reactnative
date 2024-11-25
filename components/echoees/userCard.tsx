import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { z } from 'zod'
import { UserSchema } from '@/schemas/user-schemas'
import { useRouter } from 'expo-router'

const UserCard = ({handleRedirect, user, imageSrc}:{handleRedirect?:()=>void,user:z.infer<typeof UserSchema>, imageSrc:string}) => {


  return (
    <TouchableOpacity onPress={handleRedirect} style={styles.container}>
        <Image style={styles.image} source={{uri:imageSrc}}/>
      <Text style={styles.text}>{user.fullname}</Text>
    </TouchableOpacity>
  )
}

export default UserCard

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 25,

    },
    text: {
        fontWeight: 'bold',
    },
    container: {
        padding:10,
        backgroundColor:'white',
        borderRadius:15,
        flexDirection:'row',
        alignItems:'center',
        gap:8,
        margin:8
    }
})
