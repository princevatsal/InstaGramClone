import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
const InstagramImg = require('../assets/instagram.png');
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface LoginProp {
  navigation: NavigationProp<ParamListBase>;
}
const LoginScreen = ({navigation}: LoginProp): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [formattedValue, setFormattedValue] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const phoneInput = useRef<PhoneInput>(null);

  return (
    <SafeAreaView style={styles.container as ViewStyle}>
      <Image source={InstagramImg} style={styles.instaImg as ImageStyle} />
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="IN"
        layout="first"
        onChangeText={text => {
          setValue(text);
        }}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        withDarkTheme
        withShadow
        autoFocus
      />
      <TouchableOpacity style={styles.button as ViewStyle}>
        <Text style={styles.btnTxt}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.loginTxt}>
        Already have a account.
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.loginBtn as TextStyle}>SignUp</Text>
        </TouchableOpacity>
      </Text>
    </SafeAreaView>
  );
};
const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  instaImg: {
    height: '6%',
    resizeMode: 'contain',
    marginBottom: '5%',
  },
  button: {
    marginTop: '5%',
    width: '80%',
    padding: '3%',
    backgroundColor: '#0095f6',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 14,
  },
  loginTxt: {
    marginTop: '3%',
    color: 'grey',
  },
  loginBtn: {
    top: 3,
    color: '#0095f6',
    fontWeight: 'bold',
  },
};

export default LoginScreen;
