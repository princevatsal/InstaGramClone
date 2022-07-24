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
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {uploadImageToStorage} from './action';
import {connect} from 'react-redux';
import {getPosts} from '../../Utility';
import {changePosts} from '../../redux/actions';
import {styles} from './styles';
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
      const imgObj = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        maxWidth: 780,
        maxHeight: 780,
      });
      imgObj && setImageFromImageObject(imgObj);
      imgObj && setImageNameFromImageObject(imgObj);
    } catch (err) {}
  };

  const setImageFromImageObject = (imgObj: ImagePickerResponse): void => {
    setImage(
      imgObj.assets
        ? imgObj.assets[0]
          ? imgObj.assets[0].uri
            ? imgObj.assets[0].uri
            : null
          : null
        : null,
    );
  };
  const setImageNameFromImageObject = (imgObj: ImagePickerResponse) => {
    setFileName(
      imgObj.assets
        ? imgObj.assets[0]
          ? imgObj.assets[0].fileName
            ? imgObj.assets[0].fileName
            : '' + Date.now() + '.jpg'
          : '' + Date.now() + '.jpg'
        : '' + Date.now() + '.jpg',
    );
  };

  const validationCheck = (): boolean => {
    if (!image) {
      Alert.alert('Please select a image');
      return false;
    }
    if (caption.trim().length == 0) {
      Alert.alert('Please enter a caption');
      return false;
    }
    return true;
  };

  const Submit = () => {
    if (user && validationCheck()) {
      setLoading(true);
      image &&
        uploadImageToStorage(
          fileName,
          image,
          caption,
          user.uid,
          user.name,
        ).then(async () => {
          setPostsArray(await getPosts());
          setLoading(false);
        });
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

const mapStateToProps = (state: stateType) => ({
  user: state.user,
});
const mapDispatchToProps = (dispatch: any) => ({
  setPostsArray: (postsArray: postObjectDataType[]) =>
    dispatch(changePosts(postsArray)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NewPostScreen);
