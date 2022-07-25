import React, {useEffect, useState} from 'react';
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
import {
  stateType,
  userObjectDataType,
  ProfileScreenProp,
  postObjectDataType,
} from '../../Types';
import Navbar from '../../components/Navbar';
import {changeUser} from '../../redux/actions';
import {styles} from './styles';
const Avatar = require('../../assets/img1.jpg');
const Avatar2 = require('../../assets/avatar.png');
const LogoutImg = require('../../assets/logout.png');

const ProfileScreen = ({
  navigation,
  user,
  posts,
  setUserObject,
}: ProfileScreenProp): JSX.Element => {
  const [myPosts, setMyPosts] = useState<postObjectDataType[]>([]);
  useEffect(() => {
    setMyPosts(user ? posts.filter(post => post.user.uid == user.uid) : []);
  }, [posts]);

  type smallPostProp = {coverImage: string};
  const RenderSmallPost: React.FC<smallPostProp> = ({
    coverImage,
  }: smallPostProp): JSX.Element => {
    return (
      <View style={styles.postImageCover}>
        <Image
          source={{uri: coverImage}}
          style={styles.postImage as ImageStyle}
        />
      </View>
    );
  };
  const LogOut = (): void => {
    setUserObject(null);
    auth().signOut();
  };
  return (
    <SafeAreaView style={styles.container}>
      <Navbar
        userName={user ? user.name : 'UserName'}
        navigation={navigation}
      />
      <View style={styles.row as ViewStyle}>
        <Image source={Avatar2} style={styles.profileImg as ImageStyle} />
        <View style={styles.stats as ViewStyle}>
          <Text style={styles.value as TextStyle}>{myPosts.length}</Text>
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
            {myPosts.length == 0 ? (
              <Text style={styles.emptyMessage as TextStyle}>
                No Post found
              </Text>
            ) : (
              myPosts.map(i => (
                <React.Fragment key={i.id}>
                  <RenderSmallPost coverImage={i.coverImage} />
                </React.Fragment>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state: stateType) => ({
  user: state.user,
  posts: state.posts,
});
const mapDispatchToProps = (dispatch: any) => ({
  setUserObject: (userObject: userObjectDataType) =>
    dispatch(changeUser(userObject)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
