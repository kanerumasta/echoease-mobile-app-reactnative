import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, Tabs, useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const Layout = () => {
    const router = useRouter()
  return (
    <Tabs
    screenOptions={{


        tabBarStyle: {
            backgroundColor: 'white',
            overflow: 'hidden',
            paddingVertical: 10,
            height: 70,
        },
        tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 12,
        },
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={18}/>
        ),
    }}
    >
        <Tabs.Screen name='bookings'  options={{headerTitleAlign:'center',title:'My Bookings', headerStyle: {
          backgroundColor: '#4aacfb',
          elevation: 0,
          shadowOpacity: 0,



        },headerTintColor:"#fff",headerTitleStyle:{fontWeight:'bold'}, headerLeft: () => (
            <TouchableOpacity

              onPress={() => {
                router.replace('/')
              }}
              style={{ marginHorizontal: 15 }} // Optional: Add some padding on the right
            >
              <Ionicons name="home" size={24} color="white" />
            </TouchableOpacity>
          ), tabBarIcon: ({ size, color }) => (
            <Ionicons name="book" size={18} color={color} />
        ),

        }}/>
        <Tabs.Screen name='completed' options={{headerTitleAlign:'center',title:'Completed Bookings',headerStyle: {
          backgroundColor: '#4aacfb',
          
          elevation: 0,
          shadowOpacity: 0,

        },headerTintColor:"#fff",headerTitleStyle:{fontWeight:'bold'},tabBarIcon: ({ size, color }) => (
            <Ionicons name="checkmark-circle-sharp" size={18} color={color} />
        ),}}/>
        <Tabs.Screen name='upcoming' options={{headerTitleAlign:'center',title:'Upcoming Bookings',headerStyle: {
          backgroundColor: '#4aacfb',
          elevation: 0,
          shadowOpacity: 0,

        },headerTintColor:"#fff",headerTitleStyle:{fontWeight:'bold'},tabBarIcon: ({ size, color }) => (
            <Ionicons name="calendar-sharp" size={18} color={color} />
        ),}}/>
        <Tabs.Screen name='pending' options={{headerTitleAlign:'center',title:'Pending Bookings',headerStyle: {
          backgroundColor: '#4aacfb',
          elevation: 0,
          shadowOpacity: 0,

        },headerTintColor:"#fff",headerTitleStyle:{fontWeight:'bold'},tabBarIcon: ({ size, color }) => (
            <Ionicons name="hourglass-sharp" size={18} color={color} />
        ),}}/>

    </Tabs>
  )
}

export default Layout
