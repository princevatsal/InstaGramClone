import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Image,
  Touchable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import CrossImg from '../assets/cross.png';
import ArrowImg from '../assets/right-arrow.png';
import PlusImg from '../assets/plus.png';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const NewPost = ({navigation}) => {
  const [image, setImage] = useState(null);
  const PickImageFromGallery = async () => {
    try {
      const result = await launchImageLibrary({});
      setImage(result.assets[0]);
      console.log(result);
    } catch (err) {
      console.log(err, 'see');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.crossCover}
          onPress={() => navigation.navigate('Home')}>
          <Image source={CrossImg} style={styles.cross} />
        </TouchableOpacity>
        <Text style={styles.topHeading}>Add new post</Text>
        <TouchableOpacity style={styles.arrowCover}>
          <Image source={ArrowImg} style={styles.arrow} />
        </TouchableOpacity>
      </View>
      {image ? (
        <Image style={styles.selectedImage} source={{uri: image.uri}} />
      ) : (
        <TouchableOpacity
          style={styles.imagePicker}
          onPress={PickImageFromGallery}>
          <Text style={styles.pickerText}>
            Click to select photo from gallery
          </Text>
          <View style={styles.plusIconCover}>
            <Image source={PlusImg} style={styles.plusIcon} />
          </View>
        </TouchableOpacity>
      )}
      <View style={styles.captionContainer}>
        <Text style={styles.captionLabel}>Enter Caption</Text>
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
export default NewPost;
