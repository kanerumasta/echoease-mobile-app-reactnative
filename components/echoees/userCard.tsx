import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { z } from 'zod'
import { UserSchema } from '@/schemas/user-schemas'

const UserCard = ({user, imageSrc}:{user:z.infer<typeof UserSchema>, imageSrc:string}) => {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={{uri:imageSrc}}/>
      <Text style={styles.text}>{user.fullname}</Text>
    </View>
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
