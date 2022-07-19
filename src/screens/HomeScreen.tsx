import React from 'react';
import {StyleSheet, Text, View, SafeAreaView, Dimensions} from 'react-native';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import {FlashList} from '@shopify/flash-list';
const HEIGHT = Dimensions.get('window').height;
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

const HomeScreen: React.FC = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Navbar />
        <View style={styles.feed}>
          <FlashList
            data={DATA}
            renderItem={({item}) => <Post />}
            estimatedItemSize={200}
          />
          {/* <Post /> */}
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
