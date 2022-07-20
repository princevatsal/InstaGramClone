import React from 'react';
import {Text, View, SafeAreaView, Image, ScrollView} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Navbar from '../components/Navbar';
import Avatar from '../assets/img1.jpg';
import Avatar2 from '../assets/avatar.png';
interface ProfileProp {
  navigation: NavigationProp<ParamListBase>;
}
const ProfileScreen: React.FC<ProfileProp> = ({
  navigation,
}: ProfileProp): JSX.Element => {
  const RenderSmallPost: React.FC = (): JSX.Element => {
    return (
      <View style={styles.postImageCover}>
        <Image source={Avatar} style={styles.postImage} />
      </View>
    );
  };

  const posts = [{}, {}, {}];
  return (
    <SafeAreaView style={styles.container}>
      <Navbar userName="Priyansh Vatsal" navigation={navigation} />
      <View style={styles.row}>
        <Image source={Avatar2} style={styles.profileImg} />
        <View style={styles.stats}>
          <Text style={styles.value}>16</Text>
          <Text style={styles.heading}>Posts</Text>
        </View>
      </View>
      <Text style={styles.userName}>Priyansh Vatsal</Text>
      <View style={styles.postsContainer}>
        <Text style={styles.postsHeading}>My Posts</Text>
        <ScrollView>
          <View style={styles.postsList}>
            {posts.length == 0 ? (
              <Text style={styles.emptyMessage}>No Post found</Text>
            ) : (
              posts.map(() => <RenderSmallPost />)
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  row: {
    height: '10%',
    flexDirection: 'row',
    padding: '5%',
    marginTop: '2%',
    alignItems: 'center',
    marginBottom: '2%',
  },
  profileImg: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: 500,
    resizeMode: 'cover',
  },
  stats: {
    width: '82%',
    alignItems: 'center',
  },
  value: {
    color: '#000',
    fontWeight: 'bold',
  },
  userName: {
    marginLeft: '4%',
    fontSize: 12,
    color: '#000',
    fontWeight: 'bold',
  },
  postsContainer: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#a1a1a1',
    marginTop: '5%',
    paddingTop: '2%',
  },
  postsHeading: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  postsList: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  postImageCover: {
    width: '32.8%',
    aspectRatio: 1,
    marginBottom: '1%',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  emptyMessage: {
    marginTop: '5%',
    width: '100%',
    textAlign: 'center',
    color: 'grey',
  },
  heading: {
    color: '#000',
  },
};
export default ProfileScreen;
