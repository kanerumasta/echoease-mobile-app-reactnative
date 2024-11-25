import { Dimensions, Linking, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import Dialog from 'react-native-dialog'
import { useFetchDetailCurrentArtistQuery } from '@/redux/features/artistApiSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Settings() {
  const [logoutDVisible, setLogoutDVisible] = useState(false)
  const { data: currentArtist } = useFetchDetailCurrentArtistQuery()
  const router = useRouter()

  const handleLogout = async () => {
    setLogoutDVisible(false)
    await AsyncStorage.clear()
    router.push('/login')
  }

  const redirectToTerms = () => {
    Linking.openURL(`${process.env.EXPO_PUBLIC_SITE}/terms-and-conditions`)
      .catch((err) => console.error("Failed to open URL:", err))
  }

  const redirectToSupport = () => {
    Linking.openURL(`${process.env.EXPO_PUBLIC_SITE}/support`)
      .catch((err) => console.error("Failed to open URL:", err))
  }

  const redirectToPortfolio = () => {
    currentArtist && Linking.openURL(`${process.env.EXPO_PUBLIC_SITE}/${currentArtist.slug}`)
      .catch((err) => console.error("Failed to open URL:", err))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.menuContainer}>
        <MenuButton label="My Portfolio" onClick={redirectToPortfolio} />
        <MenuButton label="Terms & Conditions" onClick={redirectToTerms} />
        <MenuButton label="Help & Chat Support" onClick={redirectToSupport} />
        <MenuButton label="Logout" onClick={()=>setLogoutDVisible(true)} />
      </View>
      <Dialog.Container visible={logoutDVisible}>
        <Dialog.Title>Logout</Dialog.Title>
        <Dialog.Description>Are you sure you want to logout?</Dialog.Description>
        <Dialog.Button
          style={styles.dialogButtonCancel}
          label="Cancel"
          onPress={() => setLogoutDVisible(false)}
        />
        <Dialog.Button
          style={styles.dialogButtonLogout}
          label="Logout"
          onPress={handleLogout}
        />
      </Dialog.Container>
    </View>
  )
}

const MenuButton = ({ label, onClick }: { label: string, onClick: () => void }) => {
  return (
    <TouchableOpacity onPress={onClick} style={styles.menuButton}>
        <Text>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:15,

    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  menuContainer: {


    borderRadius: 10,
  },
  menuButton: {

    backgroundColor: '#fff',
    elevation: 4,
    margin: 10,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  dialogButtonCancel: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginLeft: 5,
    color: '#fff',
    borderRadius: 5,
  },
  dialogButtonLogout: {
    backgroundColor: '#FF0000',
    marginLeft: 5,
    color: '#fff',
    borderRadius: 5,
  },
})
