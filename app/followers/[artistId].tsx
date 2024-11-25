import Bookings from '@/components/bookings/bookings';
import Completed from '@/components/bookings/completed';
import { Pending } from '@/components/bookings/pending';
import { UpcomingBookings } from '@/components/bookings/upcoming';
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { Following } from '@/components/echoees/following';
import { useLocalSearchParams } from 'expo-router';
import { Followers } from '@/components/echoees/followers';
import ConnectionsTab from '@/components/echoees/connectionsTab';


type Route ={
    key:"followers"|"following"|"connections",
    title:string,
    artistId:string
}
const renderScene = ({ route }:{route:Route}) => {
    switch (route.key) {
      case 'following':
        return <Followers artistId={parseInt(route.artistId)}/>;
      case 'followers':
        return <Following artistId={route.artistId} />;
    case 'connections':
        return <ConnectionsTab artistId={route.artistId}/>
      default:
        return null;
    }
  };



export default function FollowersTabs() {
    const {artistId} = useLocalSearchParams<{artistId:string}>()
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

  const routes:Route[] = [
    { key: 'followers', title: 'Following' , artistId:artistId},
    { key: 'following', title: 'Followers', artistId:artistId },
    { key: 'connections', title: 'Connections', artistId:artistId },

  ];
  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          style={{
            backgroundColor: 'white', // Tab bar background (inactive state)

            elevation: 0, // Removes shadow/elevation for a flat design
          }}
          tabStyle={
            {
                padding:0
            }
          }

          activeColor='dodgerblue'
          inactiveColor='black'

          labelStyle={{
          }}
          indicatorStyle={{
            backgroundColor: 'dodgerblue',
            height: 4,
            borderRadius: 2,
          }}
        />
      )}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width}}

    />
  );
}
