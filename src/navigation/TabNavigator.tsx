import React from 'react';
import {Image, ImageStyle, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewPostScreen from '../screens/NewPostScreen';
const HomeFillImg = require('../assets/home-fill.png');
const HomeImg = require('../assets/home.png');
const AvatarImg = require('../assets/avatar.png');
const PlusImg = require('../assets/plus.png');
const PlusFilledImg = require('../assets/plus-fill.png');
const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  type IconParam = {focused: boolean};

  const ProfileIcon = ({focused}: IconParam): JSX.Element => (
    <View style={focused ? styles.circleActive : styles.circle}>
      <Image source={AvatarImg} style={styles.avatar as ImageStyle} />
    </View>
  );
  const HomeIcon = ({focused}: IconParam): JSX.Element => (
    <Image
      source={focused ? HomeFillImg : HomeImg}
      style={styles.homeIcon as ImageStyle}
    />
  );
  const NewPostIcon = ({focused}: IconParam): JSX.Element => (
    <Image
      source={focused ? PlusFilledImg : PlusImg}
      style={styles.homeIcon as ImageStyle}
    />
  );

  const ManageIcon = (name: string, focused: boolean): JSX.Element =>
    name == 'Home' ? (
      <HomeIcon focused={focused} />
    ) : name == 'Profile' ? (
      <ProfileIcon focused={focused} />
    ) : (
      <NewPostIcon focused={focused} />
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
          name="NewPost"
          component={NewPostScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
const styles = {
  circle: {
    height: 25,
    width: 25,
    borderRadius: 25,
    borderWidth: 0,
    borderColor: '#000',
  },
  circleActive: {
    height: 25,
    width: 25,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#000',
  },
  avatar: {height: '100%', width: '100%', resizeMode: 'contain'},
  homeIcon: {height: 30, width: 30, resizeMode: 'contain'},
};
