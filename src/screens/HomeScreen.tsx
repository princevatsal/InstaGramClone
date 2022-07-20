import React from 'react';
import {StyleSheet, View, SafeAreaView, Dimensions} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';

import Navbar from '../components/Navbar';
import Post from '../components/Post';

const HEIGHT: number = Dimensions.get('window').height;
const DATA = [
  {
    title: 'First Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'Second Item',
  },
  {
    title: 'Second Item',
  },
];

interface HomeProp {
  navigation: NavigationProp<ParamListBase>;
}

const HomeScreen: React.FC<HomeProp> = ({
  navigation,
}: HomeProp): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Navbar navigation={navigation} />
        <View style={styles.feed}>
          <FlashList data={DATA} renderItem={() => <Post />} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feed: {
    height: '100%',
    paddingBottom: 0.05 * HEIGHT,
  },
});

export default HomeScreen;
