import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import {connect} from 'react-redux';
import {changePosts, changeUser} from '../redux/actions';
import {useState} from 'react';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {getUserDetails, getPosts} from '../Utility';
import {
  MainStackPageProp,
  userObjectDataType,
  stateType,
  postObjectDataType,
} from '../Types';

const MainStack = ({
  user,
  setUserObject,
  setPostsArray,
}: MainStackPageProp): JSX.Element => {
  const onAuthStateChanged = (userObj: any) => {
    if (userObj) {
      getUserDetails(userObj.phoneNumber)
        .then(data => {
          setUserObject(data);
          getPosts()
            .then(posts => {
              setPostsArray(posts);
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
            });
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const [loading, setLoading] = useState<boolean>(true);

  return loading ? (
    <LoadingScreen />
  ) : user ? (
    <TabNavigator />
  ) : (
    <AuthNavigator />
  );
};

const mapStateToProps = (state: stateType) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch: any) => ({
  setUserObject: (userObject: userObjectDataType) =>
    dispatch(changeUser(userObject)),
  setPostsArray: (postsArray: postObjectDataType[]) =>
    dispatch(changePosts(postsArray)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainStack);
