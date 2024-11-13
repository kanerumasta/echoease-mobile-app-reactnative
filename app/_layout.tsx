import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
            headerStyle:{
                backgroundColor:'dodgerblue'
            }


        }}
      >
        <Stack.Screen name='index' options={options.index} />
        <Stack.Screen name='profile' />
        <Stack.Screen name='echoees/index' options={{headerShown:false}}/>
        <Stack.Screen name='echoees/book' options={{presentation:'formSheet'}}/>
        <Stack.Screen name='(tabs)' options={{headerShown:false}}/>
        <Stack.Screen name='messages/index' options={{headerShown:false}}/>
        <Stack.Screen name='messages/[code]' options={{headerShown:false}}/>
      </Stack>
    </Provider>
  );
}

const options = {
    profile:{
        title:'Profile'
    },
    index:{
        title:'Echoease'
    },
    echoees:{
        title:'Echoees',
        headerShown:false
    }
}
