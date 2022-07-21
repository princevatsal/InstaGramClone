import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  ImageStyle,
  TextStyle,
  ActivityIndicator,
} from 'react-native';
const InstagramImg = require('../../assets/instagram.png');
import PhoneInput from 'react-native-phone-number-input';
import {
  validateName,
  setUserDetails,
  checkUserExists,
  getPosts,
} from '../../Utility';
import {
  SignUpPageProp,
  nameErrorType,
  userObjectDataType,
  stateType,
  postObjectDataType,
} from '../../Types';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {changeUser, changePosts} from '../../redux/actions';
import {styles} from './styles';

const SignUpScreen = ({
  navigation,
  setUserObject,
  setPostsArray,
}: SignUpPageProp): JSX.Element => {
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [formattedPhoneNo, setFormattedPhoneNo] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [isValidPhoneNo, setIsValidPhoneNo] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<any>(null);
  const [code, setCode] = useState<string>('');
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [codeSubmitLoading, setCodeSubmitLoading] = useState<boolean>(false);
  const [showResetBtn, setShowResetBtn] = useState<boolean>(false);
  const phoneInput = useRef<PhoneInput>(null);

  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setTimeout(() => setShowResetBtn(true), 5000);
    } catch (err) {
      console.log(err, 'error creating user');
    }
  }

  const SubmitCode = async () => {
    setCodeSubmitLoading(true);
    try {
      const result = await confirm.confirm(code);
      await setUserDetails(name, result.user.phoneNumber, result.user.uid);
      setUserObject({
        name,
        phoneNo: result.user.phoneNumber,
        uid: result.user.uid,
      });
      getPosts()
        .then(posts => {
          setPostsArray(posts);
          setCodeSubmitLoading(false);
          setShowResetBtn(false);
        })
        .catch(() => {
          setCodeSubmitLoading(false);
          setShowResetBtn(false);
        });
    } catch (err) {
      setShowResetBtn(true);
      setCodeSubmitLoading(false);
    }
  };

  const Submit = async () => {
    setError(null);
    if (!isValidPhoneNo) {
      setError('Please enter a valid phone No');
      return;
    }
    checkUserExists(formattedPhoneNo)
      .then(async userExists => {
        if (!userExists) {
          const val: nameErrorType = validateName(name);
          if (typeof val == 'object') {
            setError(val.errorMessage);
            return;
          }
          setSubmitLoading(true);
          await signInWithPhoneNumber(formattedPhoneNo);
          setSubmitLoading(false);
        } else {
          setError('User already exists');
          setSubmitLoading(false);
        }
      })
      .catch(() => {
        setSubmitLoading(false);
      });
  };

  const handleChangeFormattedPhoneNumber = (phoneNo: string): void => {
    setFormattedPhoneNo(phoneNo);
    const checkValid = phoneInput.current
      ? phoneInput.current.isValidNumber(phoneNo)
      : false;
    setIsValidPhoneNo(checkValid);
  };

  return (
    <SafeAreaView style={styles.container as ViewStyle}>
      <Image source={InstagramImg} style={styles.instaImg as ImageStyle} />
      {!confirm && <Text style={styles.name as TextStyle}>Name</Text>}
      {!confirm && (
        <TextInput
          style={styles.nameField}
          placeholder="Enter your name"
          value={name}
          onChangeText={e => setName(e)}
        />
      )}
      {confirm ? (
        <TextInput
          style={styles.codeField}
          keyboardType="numeric"
          placeholder="Enter Otp"
          value={code}
          onChangeText={e => setCode(e)}
        />
      ) : (
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNo}
          defaultCode="IN"
          layout="first"
          onChangeText={setPhoneNo}
          onChangeFormattedText={handleChangeFormattedPhoneNumber}
          withDarkTheme
          withShadow
          autoFocus
        />
      )}
      {error && <Text style={styles.errorTxt}>{error}</Text>}
      <TouchableOpacity
        style={styles.button as ViewStyle}
        onPress={confirm ? SubmitCode : Submit}>
        {submitLoading || codeSubmitLoading ? (
          <ActivityIndicator size={15} color="#fff" />
        ) : (
          <Text style={styles.btnTxt}>{confirm ? 'Submit' : 'Sign Up'}</Text>
        )}
      </TouchableOpacity>
      {showResetBtn && confirm && (
        <TouchableOpacity
          onPress={() => {
            setConfirm(null);
            setCode('');
          }}>
          <Text style={styles.errorTxt}>Reset</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.loginTxt}>
        Already have a account.
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginBtn as TextStyle}> Login</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
