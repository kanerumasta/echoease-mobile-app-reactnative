import Bookings from '@/components/bookings/bookings';
import Completed from '@/components/bookings/completed';
import { Pending } from '@/components/bookings/pending';
import { UpcomingBookings } from '@/components/bookings/upcoming';
import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

type Route ={
    key:"pending"|"upcoming"|"completed"|"all",
    title:string
}
const renderScene = ({ route }:{route:Route}) => {
    switch (route.key) {
      case 'pending':
        return <Pending/>;
      case 'upcoming':
        return <UpcomingBookings />;
      case 'completed':
        return <Completed />;
      case 'all':
        return <Bookings />;
      default:
        return null;
    }
  };

const routes:Route[] = [
  { key: 'pending', title: 'Pending' },
  { key: 'upcoming', title: 'Upcoming' },
  { key: 'completed', title: 'Completed' },
  { key: 'all', title: 'All' },

];

export default function TabViewExample() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);

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

          activeColor='dodgerblue' // Active tab text color
          inactiveColor='black' // Inactive tab text color

          labelStyle={{
          }}
          indicatorStyle={{
            backgroundColor: 'dodgerblue', // Active tab indicator color (underline)
            height: 4,
            borderRadius: 2, // Adjust the thickness of the underline
            // Adjust the thickness of the underline
          }}
        />
      )}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width}}

    />
  );
}
