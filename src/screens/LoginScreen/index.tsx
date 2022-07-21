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
import {getUserDetails, checkUserExists} from '../../Utility';
import auth from '@react-native-firebase/auth';
import {SignUpPageProp, userObjectDataType, stateType} from '../../Types';
import {connect} from 'react-redux';
import {changeUser} from '../../redux/actions';
import {styles} from './styles';

const LogInScreen = ({
  navigation,
  setUserObject,
}: SignUpPageProp): JSX.Element => {
  const [phoneNo, setPhoneNo] = useState<string>('');
  const [isValidPhoneNo, setIsValidPhoneNo] = useState<boolean>(false);
  const [formattedPhoneNo, setFormattedPhoneNo] = useState<string>('');
  const phoneInput = useRef<PhoneInput>(null);
  const [confirm, setConfirm] = useState<any>(null);
  const [showResetBtn, setShowResetBtn] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [codeSubmitLoading, setCodeSubmitLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState<string>('');

  async function signInWithPhoneNumber(phoneNumber: string) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      setTimeout(() => setShowResetBtn(true), 5000);
    } catch (err) {
      setError('some error occured');
      console.log(err, 'error creating user');
    }
  }
  const SubmitCode = async (setUserObject: any) => {
    setCodeSubmitLoading(true);
    try {
      const result = await confirm.confirm(code);
      const userObject: userObjectDataType = await getUserDetails(
        result.user.phoneNumber,
      );
      if (userObject) {
        setUserObject({
          name: userObject.name,
          phoneNo: result.user.phoneNumber,
          uid: result.user.uid,
        });
        setCodeSubmitLoading(false);
        setShowResetBtn(false);
      } else {
        setCodeSubmitLoading(false);
        setShowResetBtn(true);
      }
    } catch (err) {
      console.log(err);
      setShowResetBtn(true);
      setCodeSubmitLoading(false);
    }
  };

  const Submit = async (isValidPhoneNo: boolean, formattedPhoneNo: string) => {
    setError(null);
    if (!isValidPhoneNo) {
      setError('Please enter a valid phone No');
      return;
    }
    setSubmitLoading(true);
    checkUserExists(formattedPhoneNo)
      .then(async (userExists: boolean) => {
        if (userExists) {
          await signInWithPhoneNumber(formattedPhoneNo);
          setSubmitLoading(false);
        } else {
          setError('User Does not exists');
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
          defaultValue={''}
          defaultCode="IN"
          layout="first"
          onChangeText={e => setPhoneNo(e)}
          onChangeFormattedText={handleChangeFormattedPhoneNumber}
          withDarkTheme
          withShadow
          autoFocus
        />
      )}
      {error && <Text style={styles.errorTxt}>{error}</Text>}
      <TouchableOpacity
        style={styles.button as ViewStyle}
        onPress={
          confirm
            ? () => SubmitCode(setUserObject)
            : () => Submit(isValidPhoneNo, formattedPhoneNo)
        }>
        {submitLoading || codeSubmitLoading ? (
          <ActivityIndicator size={15} color="#fff" />
        ) : (
          <Text style={styles.btnTxt}>{confirm ? 'Submit' : 'Log In'}</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.loginBtn as TextStyle}> SignUp</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  setUserObject: (userObject: userObjectDataType) =>
    dispatch(changeUser(userObject)),
});

export default connect(null, mapDispatchToProps)(LogInScreen);
