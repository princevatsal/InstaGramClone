import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import {connect} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {stateType, userObjectDataType, ProfileScreenProp} from '../Types';
import Navbar from '../components/Navbar';
import {changeUser} from '../redux/actions';
const Avatar = require('../assets/img1.jpg');
const Avatar2 = require('../assets/avatar.png');
const LogoutImg = require('../assets/logout.png');

const ProfileScreen = ({
  navigation,
  user,
  setUserObject,
}: ProfileScreenProp): JSX.Element => {
  const RenderSmallPost: React.FC = (): JSX.Element => {
    return (
      <View style={styles.postImageCover}>
        <Image source={Avatar} style={styles.postImage as ImageStyle} />
      </View>
    );
  };
  const LogOut = (): void => {
    setUserObject(null);
    auth().signOut();
  };
  const posts = [{}, {}, {}];
  return (
    <SafeAreaView style={styles.container}>
      <Navbar
        userName={user ? user.name : 'UserName'}
        navigation={navigation}
      />
      <View style={styles.row as ViewStyle}>
        <Image source={Avatar2} style={styles.profileImg as ImageStyle} />
        <View style={styles.stats as ViewStyle}>
          <Text style={styles.value as TextStyle}>16</Text>
          <Text style={styles.heading}>Posts</Text>
        </View>
        <View style={styles.stats as ViewStyle}>
          <TouchableOpacity style={styles.logOutImgCover} onPress={LogOut}>
            <Image source={LogoutImg} style={styles.logOutImg as ImageStyle} />
          </TouchableOpacity>
          <Text style={styles.heading}>Logout</Text>
        </View>
      </View>
      <Text style={styles.userName as TextStyle}>
        {user ? user.name : 'UserName'}
      </Text>
      <View style={styles.postsContainer}>
        <Text style={styles.postsHeading as TextStyle}>My Posts</Text>
        <ScrollView>
          <View style={styles.postsList as ViewStyle}>
            {posts.length == 0 ? (
              <Text style={styles.emptyMessage as TextStyle}>
                No Post found
              </Text>
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
    width: '41%',
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
  logOutImgCover: {
    width: '16%',
    aspectRatio: 1,
  },
  logOutImg: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
};
const mapStateToProps = (state: stateType) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch: any) => ({
  setUserObject: (userObject: userObjectDataType) =>
    dispatch(changeUser(userObject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
