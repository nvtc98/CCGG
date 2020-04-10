import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import Transpose from '../screens/Transpose';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{ style: styles.bottomTabContainer, activeTintColor: "#FFF", inactiveTintColor: "#CCC" }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Tra cứu',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={HomeScreen}
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-search" />,
        }}
      />
      <BottomTab.Screen
        name="Transpose"
        component={Transpose}
        options={{
          title: 'Transpose',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Tra cứu hợp âm';
    case 'Search':
      return 'Tìm kiếm hợp âm';
    case 'Transpose':
      return 'Transpose - Dịch giọng';
  }
}


const styles = StyleSheet.create({
  bottomTabContainer: {
    backgroundColor: '#F05A67',
  },
});