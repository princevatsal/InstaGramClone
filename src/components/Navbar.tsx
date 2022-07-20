import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import InstaGramImg from '../assets/instagram.png';
import Plus from '../assets/plus.png';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

interface NavbarProp {
  userName?: string;
  navigation: NavigationProp<ParamListBase>;
}

const Navbar: React.FC<NavbarProp> = ({
  userName,
  navigation,
}: NavbarProp): JSX.Element => {
  return (
    <View style={styles.navbar}>
      {!userName ? (
        <Image source={InstaGramImg} style={styles.instaGramIcon} />
      ) : (
        <Text style={styles.userName}>{userName}</Text>
      )}
      <TouchableOpacity
        style={styles.plusIconCover}
        onPress={() => {
          navigation.navigate('NewPost');
        }}>
        <Image source={Plus} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#e5e6e5',
    height: '7%',
    width: '100%',
  },
  instaGramIcon: {
    height: '75%',
    width: '25%',
    resizeMode: 'contain',
  },
  plusIconCover: {
    height: '65%',
    width: '10%',
  },
  plusIcon: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Navbar;
