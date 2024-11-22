import Bookings from '@/components/bookings/bookings';
import Completed from '@/components/bookings/completed';
import { Pending } from '@/components/bookings/pending';
import { UpcomingBookings } from '@/components/bookings/upcoming';
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Followers } from './followers';
import { Following } from './following';

type Route ={
    key:"followers"|"following",
    title:string,
    artistId:string
}
const renderScene = ({ route }:{route:Route}) => {
    switch (route.key) {
      case 'followers':
        return <Followers artistId={route.artistId}/>;
      case 'following':
        return <Following artistId={route.artistId} />;
      default:
        return null;
    }
  };



export default function FollowersTabs({artistId}:{artistId:number}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const routes:Route[] = [
    { key: 'followers', title: 'Following' , artistId},
    { key: 'following', title: 'Followers', artistId },

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
