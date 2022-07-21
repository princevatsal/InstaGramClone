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
  Alert,
  ActivityIndicator,
} from 'react-native';
import {NewPostPageProp, stateType, postObjectDataType} from '../../Types';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImageToStorage} from './action';
import {connect} from 'react-redux';
import {getPosts} from '../../Utility';
import {changePosts} from '../../redux/actions';
const CrossImg = require('../../assets/cross.png');
const ArrowImg = require('../../assets/right-arrow.png');
const PlusImg = require('../../assets/plus.png');

const NewPostScreen = ({
  navigation,
  user,
  setPostsArray,
}: NewPostPageProp): JSX.Element => {
  const [image, setImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [caption, setCaption] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const PickImageFromGallery = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        maxWidth: 780,
        maxHeight: 780,
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
      result &&
        setFileName(
          result.assets
            ? result.assets[0]
              ? result.assets[0].fileName
                ? result.assets[0].fileName
                : '' + Date.now() + '.jpg'
              : '' + Date.now() + '.jpg'
            : '' + Date.now() + '.jpg',
        );
    } catch (err) {}
  };
  const Submit = () => {
    if (!image) {
      Alert.alert('Please select a image');
      return;
    }
    if (caption.trim().length == 0) {
      Alert.alert('Please enter a caption');
      return;
    }

    if (user) {
      setLoading(true);
      uploadImageToStorage(fileName, image, caption, user.uid, user.name).then(
        async () => {
          setPostsArray(await getPosts());
          setLoading(false);
        },
      );
    }
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
        <TouchableOpacity style={styles.arrowCover} onPress={Submit}>
          <Image source={ArrowImg} style={styles.arrow as ImageStyle} />
        </TouchableOpacity>
      </View>
      {image ? (
        <View style={styles.imageContainer}>
          <Image
            style={styles.selectedImage as ImageStyle}
            source={{uri: image}}
          />
          {loading && (
            <View style={styles.overlay as ViewStyle}>
              <ActivityIndicator size={30} color="#ffffff" />
            </View>
          )}
        </View>
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
        {image && (
          <TouchableOpacity onPress={() => setImage(null)}>
            <Text style={styles.reset as TextStyle}>Reset image</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.captionLabel as TextStyle}>Enter Caption</Text>
        <TextInput
          placeholder="Type your thaughts"
          style={styles.caption}
          value={caption}
          onChangeText={setCaption}
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
  imageContainer: {
    margin: '5%',
    height: '40%',
    width: '90%',
    backgroundColor: '#D3D3D3',
  },
  selectedImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  captionLabel: {
    color: '#000',
    fontWeight: 'bold',
  },
  reset: {
    color: 'red',
    paddingVertical: '2%',
    fontWeight: 'bold',
  },
  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.8)',
  },
};
const mapStateToProps = (state: stateType) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch: any) => ({
  setPostsArray: (postsArray: postObjectDataType[]) =>
    dispatch(changePosts(postsArray)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewPostScreen);
