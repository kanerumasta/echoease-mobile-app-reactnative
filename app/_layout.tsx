import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { WebSocketProvider } from '@/providers';
import Toast from 'react-native-toast-message';
import { Ionicons } from '@expo/vector-icons';
import { Image, View } from 'react-native';
import { useFetchNewNotificationsQuery } from '@/redux/features/notificationApiSlice';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const router = useRouter()

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
        <WebSocketProvider>
            <Stack
                screenOptions={{
                    headerStyle:{

                        backgroundColor: 'dodgerblue'
                    }
                }}
            >
                <Stack.Screen name='index' options={{
                    headerShown:false
                }} />


                <Stack.Screen name='echoees/index' options={{headerShown:false}}/>
                <Stack.Screen name='login' options={{headerShown:false}}/>
                <Stack.Screen name='activate' options={{headerShown:false}}/>
                <Stack.Screen name='profile' options={{
                    title:'Profile',
                    headerTitleAlign:'center',
                    headerTintColor:'#fff'
                }}/>
                <Stack.Screen name='change-password' options={{headerShown:false}}/>
                <Stack.Screen name='forgot-password' options={{headerShown:false}}/>
                <Stack.Screen name='echoees/book' options={{presentation:'formSheet'}}/>
                <Stack.Screen name='(booking_tabs)' options={{headerShown:false}}/>
                <Stack.Screen name='messages/index' options={{headerShown:false}}/>
                <Stack.Screen name='messages/[code]' options={{headerShown:false}}/>
                <Stack.Screen name='transactions/[id]' options={{headerShown:false}}/>
                <Stack.Screen  name='transactions/index' options={{
                    title:'Transactions',
                    headerTitleAlign:'center',
                    headerShadowVisible:false,

                    headerStyle:{
                        backgroundColor:'#f0f0f0'
                    },

                }}/>
                <Stack.Screen name='notifications' options={{
                    title:'Notifications',
                    headerTitleAlign:'center',
                    headerStyle:{
                        backgroundColor:'#f0f0f0',
                    },

                    headerShadowVisible:false,
                    headerLeft:()=>(
                        <Ionicons onPress={()=>router.back()} name='chevron-back' size={25} color="rgba(0,0,0,0.6)" />
                    ),
                    headerTitleStyle:{
                        fontSize:25,
                        fontWeight:'800'
                    }


                }} />
            </Stack>
            <Toast position='top' topOffset={30}/>
      </WebSocketProvider>
    </Provider>
  );
}

const options = {
    profile:{
        title:'Profile'
    },
    index:{
        title:'Echoease',
        headerBackVisible:false,

    },
    echoees:{
        title:'Echoees',

    }
}
