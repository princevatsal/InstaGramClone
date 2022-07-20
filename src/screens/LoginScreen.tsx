import React, {useState, useRef, useEffect} from 'react';
import {Text, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import InstagramImg from '../assets/instagram.png';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';

const LoginScreen = (): JSX.Element => {
  const [value, setValue] = useState<string>('');
  const [formattedValue, setFormattedValue] = useState<string>('');
  const [valid, setValid] = useState<boolean>(false);
  const phoneInput = useRef<PhoneInput>(null);
  useEffect(() => {
    console.log('see', auth());
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Image source={InstagramImg} style={styles.instaImg} />
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
      <TouchableOpacity style={styles.button}>
        <Text style={styles.btnTxt}>Log In</Text>
      </TouchableOpacity>
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
};

export default LoginScreen;
