import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import {NewPostPageProp} from '../Types';
import {launchImageLibrary} from 'react-native-image-picker';

const CrossImg = require('../assets/cross.png');
const ArrowImg = require('../assets/right-arrow.png');
const PlusImg = require('../assets/plus.png');

const NewPostScreen = ({navigation}: NewPostPageProp): JSX.Element => {
  const [image, setImage] = useState<string | null>(null);
  const PickImageFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });
      result &&
        setImage(
          result.assets
            ? result.assets[0]
              ? result.assets[0].uri
                ? result.assets[0].uri
                : null
              : null
            : null,
        );
    } catch (err) {}
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar as ViewStyle}>
        <TouchableOpacity
          style={styles.crossCover}
          onPress={() => navigation.navigate('Home')}>
          <Image source={CrossImg} style={styles.cross as ImageStyle} />
        </TouchableOpacity>
        <Text style={styles.topHeading}>Add new post</Text>
        <TouchableOpacity style={styles.arrowCover}>
          <Image source={ArrowImg} style={styles.arrow as ImageStyle} />
        </TouchableOpacity>
      </View>
      {image ? (
        <Image style={styles.selectedImage} source={{uri: image}} />
      ) : (
        <TouchableOpacity
          style={styles.imagePicker as ViewStyle}
          onPress={PickImageFromGallery}>
          <Text style={styles.pickerText as TextStyle}>
            Click to select photo from gallery
          </Text>
          <View style={styles.plusIconCover}>
            <Image source={PlusImg} style={styles.plusIcon as ImageStyle} />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.captionContainer}>
        <Text style={styles.captionLabel as TextStyle}>Enter Caption</Text>
        <TextInput
          placeholder="Type your thaughts"
          style={styles.caption}
          multiline
        />
      </View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  topBar: {
    height: '7%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    alignItems: 'center',
  },
  crossCover: {
    width: '7%',
    aspectRatio: 1,
  },
  arrowCover: {
    width: '7%',
    aspectRatio: 1,
  },
  cross: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  arrow: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  topHeading: {
    color: '#000',
    fontSize: 18,
  },
  imagePicker: {
    margin: '5%',
    borderRadius: 8,
    height: '40%',
    width: '90%',
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    color: '#666',
    width: '40%',
    textAlign: 'center',
  },
  plusIconCover: {
    width: '15%',
    aspectRatio: 1,
  },
  plusIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  captionContainer: {
    marginHorizontal: '5%',
  },
  caption: {
    paddingTop: '3%',
    fontSize: 17,
  },
  selectedImage: {
    margin: '5%',
    borderRadius: 8,
    height: '40%',
    width: '90%',
    backgroundColor: '#D3D3D3',
  },
  captionLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
};
export default NewPostScreen;
