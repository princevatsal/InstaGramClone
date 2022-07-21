import React, {useEffect} from 'react';
import {StyleSheet, View, SafeAreaView, Dimensions} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import {connect} from 'react-redux';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import {postObjectDataType, stateType} from '../Types';

const HEIGHT: number = Dimensions.get('window').height;

interface HomeProp {
  navigation: NavigationProp<ParamListBase>;
  posts: postObjectDataType[];
}

const HomeScreen: React.FC<HomeProp> = ({
  navigation,
  posts,
}: HomeProp): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Navbar navigation={navigation} />
        <View style={styles.feed}>
          <FlashList
            data={posts}
            renderItem={item => {
              return (
                <Post
                  caption={item.item.caption}
                  coverImage={item.item.coverImage}
                />
              );
            }}
            estimatedItemSize={500}
          />
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

const mapStateToProps = (state: stateType) => ({
  posts: state.posts,
});

export default connect(mapStateToProps)(HomeScreen);
