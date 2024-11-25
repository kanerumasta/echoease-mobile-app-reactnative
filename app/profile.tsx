
import { useGetUserQuery } from '@/redux/features/authApiSlice';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/home/header';
import PersonalDetails from '../components/home/personal-details';
import { Connections } from '@/components/echoees/connection-lists';
import { useFetchDetailCurrentArtistQuery } from '@/redux/features/artistApiSlice';

const Profile = () => {
    const router = useRouter()

  const {data: current_user, isLoading} = useGetUserQuery();

  if (isLoading){
    return <View>
      <Text>Loading</Text>
    </View>
  }



  return (
    <View style={styles.container}>

      <ScrollView style={styles.container}>

        {current_user && <>
            <Header user={current_user}/>
            <PersonalDetails user={current_user}/>
        </>}

      {current_user && current_user.role === 'artist' &&  <Connections />}

      </ScrollView>
    </View>


  )
};

export default Profile

const styles = StyleSheet.create({
  container:{
    flex: 1,

  },
  heading:{
    flexDirection: 'row',
    backgroundColor: "#5BBFFF",
    height: "13%",
    width: "100%",
    alignItems: 'center',
    paddingHorizontal: 10, // Adds some padding
    borderColor: "black",
    borderBottomWidth: 0.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  safeArea: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  profileTxt:{
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1.5},
    textShadowRadius: 1,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    padding: 5,
    marginLeft: 10,
    fontWeight: 'bold',

  },
  container1:{
    position: 'relative',
    height: '25%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: 7.5,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  container2:{
    position: 'relative',
    bottom: 20,
    height: '30%',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background
    borderRadius: 7.5,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  profilePic:{
    width: 15,
    height: 15,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: 'dodgerblue', // White border for the profile picture
    marginBottom: 10,
    // flex: 1,
    // width: '30%',
    // resizeMode: 'contain',
    // alignSelf: 'center',
  },
  bg:{
    flex: 1,
    width: '100%',
    height: '100%',

  },
  name:{
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '800',
  },
  role: {
    fontSize: 16,
    color: 'dodgerblue',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'capitalize',
  },
  editButton: {
    backgroundColor: '#5BBFFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },

  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 10,
  },
  closeText: {
    marginTop: 20,
    color: 'blue',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  horizontalLine: {
    height: 1.5,
    backgroundColor: 'black', // Change color as needed
    width: '100%', // Full width
    marginVertical: 10,
    marginTop: 10, // Space above the line
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 3,

  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCircle: {
    borderColor: 'blue', // Change border color on selection
  },
  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'blue', // Inner circle color when selected
  },
  label: {
    marginLeft: 10,
  },
  selectedRadioCircle: {
    backgroundColor: '#007BFF',
},
selectedInnerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
},
optionButton: {
  borderColor: 'dodgerblue',
  borderWidth: 2,
  borderRadius: 50,
  paddingVertical: 2,
  paddingHorizontal: 10,
  alignItems: 'center',
  marginVertical: 2.5,
},
dropdown: {
  margin: 16,
  height: 50,
  borderColor: 'gray',
  borderWidth: 1,
  borderRadius: 8,
  backgroundColor: 'white',
  paddingHorizontal: 10,
  justifyContent: 'center',
},
dropdownItem: {
  height: 50, // Increased height for better visibility
  justifyContent: 'center',
  paddingHorizontal: 10,
},
dropdownText: {
  fontSize: 18, // Increased font size for better readability
  color: 'black',
},

})


//
