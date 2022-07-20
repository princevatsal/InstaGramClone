import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import Navbar from '../components/Navbar';
import Avatar from '../assets/img1.jpg';
import Avatar2 from '../assets/avatar.png';
import LogoutImg from '../assets/logout.png';
import {connect} from 'react-redux';
import {changeUser} from '../redux/actions';
import auth from '@react-native-firebase/auth';

interface ProfileProp {
  navigation: NavigationProp<ParamListBase>;
}
const ProfileScreen = ({navigation, user, setUserObject}): JSX.Element => {
  const RenderSmallPost: React.FC = (): JSX.Element => {
    return (
      <View style={styles.postImageCover}>
        <Image source={Avatar} style={styles.postImage} />
      </View>
    );
  };
  const LogOut = () => {
    setUserObject(null);
    auth().signOut();
  };
  const posts = [{}, {}, {}];
  return (
    <SafeAreaView style={styles.container}>
      <Navbar userName={user.name} navigation={navigation} />
      <View style={styles.row}>
        <Image source={Avatar2} style={styles.profileImg} />
        <View style={styles.stats}>
          <Text style={styles.value}>16</Text>
          <Text style={styles.heading}>Posts</Text>
        </View>
        <View style={styles.stats}>
          <TouchableOpacity style={styles.logOutImgCover} onPress={LogOut}>
            <Image source={LogoutImg} style={styles.logOutImg} />
          </TouchableOpacity>
          <Text style={styles.heading}>Logout</Text>
        </View>
      </View>
      <Text style={styles.userName}>{user.name}</Text>
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
const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchToProps = dispatch => ({
  setUserObject: userObject => dispatch(changeUser(userObject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
