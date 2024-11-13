import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async (title:string, token:string) => {
  try {
    console.log(token)
    console.log('titile',title)
    await AsyncStorage.setItem(title, token);
  } catch (error) {
    console.error('Failed to store the token', error);
  }
};

export default storeToken;
