import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Followers } from '@/components/echoees/followers'

const index = () => {

  return (
    <View>
      <Followers artistId={16}/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})
