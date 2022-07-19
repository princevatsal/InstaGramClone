import React from 'react';
import {Image, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import HomeFillImg from '../assets/home-fill.png';
import HomeImg from '../assets/home.png';
import AvatarImg from '../assets/avatar.png';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  type IconParam = {focused: boolean};

  const ProfileIcon = ({focused}: IconParam): JSX.Element => (
    <View style={focused ? styles.circleActive : styles.circle}>
      <Image source={AvatarImg} style={styles.avatar} />
    </View>
  );
  const HomeIcon = ({focused}: IconParam): JSX.Element => (
    <Image source={focused ? HomeFillImg : HomeImg} style={styles.homeIcon} />
  );

  const ManageIcon = (name: string, focused: boolean): JSX.Element =>
    name == 'Home' ? (
      <HomeIcon focused={focused} />
    ) : (
      <ProfileIcon focused={focused} />
    );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={route => ({
          tabBarIcon: ({focused}) => ManageIcon(route.route.name, focused),
          tabBarLabel: () => false,
        })}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Profile"
          component={HomeScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = {
  circle: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 0,
    borderColor: '#000',
  },
  circleActive: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#000',
  },
  avatar: {height: '100%', width: '100%', resizeMode: 'contain'},
  homeIcon: {height: 30, width: 30, resizeMode: 'contain'},
};
