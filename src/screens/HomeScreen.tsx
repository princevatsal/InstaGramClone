import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Navbar from '../components/Navbar';
import Post from '../components/Post';

const HomeScreen: React.FC = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Navbar />
        <View style={styles.feed}>
          <Post />
           <Post />
          <Post />
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
  },
});

export default HomeScreen;
