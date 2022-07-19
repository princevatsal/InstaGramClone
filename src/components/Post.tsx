import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Touchable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import IMG1 from '../assets/img1.jpg';
import Like from '../assets/heart.png';
import Liked from '../assets/heart-fill.png';
import Comment from '../assets/comment.png';
import Save from '../assets/save.png';
import Saved from '../assets/save-fill.png';
import Avatar from '../assets/avatar.png';
const HEIGHT = Dimensions.get('window').height;

const Post: React.FC = (): JSX.Element => {
  const RenderComment = ({text}: {text: string}): JSX.Element => {
    return (
      <View style={styles.commentRow}>
        <Image source={Avatar} style={styles.commentAvatar} />
        <Text style={styles.commentText}>{text}</Text>
      </View>
    );
  };
  const RenderDescripton = ({text}: {text: string}): JSX.Element => {
    const [showAll, setShowAll] = useState<boolean>(false);
    if (text.length < 50 || showAll)
      return <Text style={styles.descriptionTxt}>{text}</Text>;
    else
      return (
        <Text style={styles.descriptionTxtCover}>
          <Text>{text.slice(0, 40) + '... '}</Text>
          <TouchableOpacity onPress={() => setShowAll(old => !old)}>
            <Text style={styles.readMore}>more</Text>
          </TouchableOpacity>
        </Text>
      );
  };
  const [showCommentSection, setShowCommentSection] = useState<boolean>(false);
  const descriptionText: string =
    'here goes the description, some cool texts are cont goes the description, some cool texts are contgoes the description, some cool texts are contgoes the description, some cool texts are containered here xts are containered here xts are containered here';
  return (
    <View style={styles.container}>
      <Image source={IMG1} style={styles.coverImage} />
      <View style={styles.actionBar}>
        <View style={styles.leftActions}>
          <Image source={Liked} style={styles.like} />
          <TouchableOpacity onPress={() => setShowCommentSection(old => !old)}>
            <Image source={Comment} style={styles.comment} />
          </TouchableOpacity>
        </View>
        <View style={styles.rightActions}>
          <Image source={Saved} style={styles.save} />
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.likeCount}>1000 likes</Text>
        <RenderDescripton text={descriptionText} />
      </View>
      {showCommentSection && (
        <View style={styles.commentSection}>
          <View style={styles.newComment}>
            <Image source={Avatar} style={styles.commentAvatar} />
            <TextInput
              placeholder="Type your comment here"
              style={styles.commentInput}
            />
          </View>
          <View style={styles.commentList}>
            <RenderComment text="comment 1 goe here and there with lotment 1 goe here and there with lot ment 1 goe here and there with lots of love around" />
            <RenderComment text="comment 2" />
            <RenderComment text="comment 3" />
            <RenderComment text="comment 4" />
            <RenderComment text="comment 5" />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: '35%',
    paddingBottom: '6%',
  },
  coverImage: {
    height: 0.3 * HEIGHT,
    width: '100%',
    resizeMode: 'cover',
  },
  actionBar: {
    marginTop: '2%',
    height: '8%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '2%',
  },
  description: {
    paddingTop: '2%',
    paddingHorizontal: '2%',
  },
  likeCount: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#000',
  },
  descriptionTxtCover: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 14,
    color: '#000',
  },
  descriptionTxt: {
    fontSize: 14,
    color: '#000',
  },
  leftActions: {
    flexDirection: 'row',
    width: '18%',
    justifyContent: 'space-between',
  },
  rightActions: {
    flexDirection: 'row',
  },
  like: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  comment: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  save: {
    height: 30,
    width: 30,
    resizeMode: 'contain',
  },
  readMore: {
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
    top: 1,
    color: '#000',
  },
  commentSection: {
    marginTop: '2%',
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
    borderColor: '#a1a1a1',
  },
  newComment: {
    padding: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentRow: {
    padding: '2%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentAvatar: {
    aspectRatio: 1,
    width: '8%',
    borderRadius: 100,
    resizeMode: 'cover',
    marginRight: '2%',
  },
  commentInput: {
    width: '85%',
  },
  commentList: {
    paddingLeft: '3%',
  },
  commentText: {
    width: '85%',
  },
});
export default Post;
