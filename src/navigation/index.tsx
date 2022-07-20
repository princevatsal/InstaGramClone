import AuthNavigator from './AuthNavigator';
import TabNavigator from './TabNavigator';
import LoadingScreen from '../screens/LoadingScreen';
import {connect} from 'react-redux';
import {changeUser} from '../redux/actions';
import {useState} from 'react';
import React, {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {getUserDetails} from '../Utility';

const MainStack = ({user, setUserObject}): JSX.Element => {
  const onAuthStateChanged = userObj => {
    if (userObj) {
      getUserDetails(userObj.phoneNumber)
        .then(data => {
          setUserObject(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const [loading, setLoading] = useState(true);
  return loading ? (
    <LoadingScreen />
  ) : user ? (
    <TabNavigator />
  ) : (
    <AuthNavigator />
  );
};

const mapStateToProps = state => ({
  user: state.user,
});
const mapDispatchToProps = dispatch => ({
  setUserObject: userObject => dispatch(changeUser(userObject)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MainStack);
