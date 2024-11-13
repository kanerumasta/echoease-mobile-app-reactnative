import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'

const Layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='bookings' options={{title:'All'}}/>
        <Tabs.Screen name='completed' options={{headerShown:false}}/>

    </Tabs>
  )
}

export default Layout
