import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
const IMG1 = require('../assets/img1.jpg');
const Like = require('../assets/heart.png');
const Liked = require('../assets/heart-fill.png');
const CommentIconImg = require('../assets/comment.png');
const Save = require('../assets/save.png');
const Saved = require('../assets/save-fill.png');
const Avatar = require('../assets/avatar.png');
const HEIGHT = Dimensions.get('window').height;

type PostProps = {coverImage: string; caption: string};

const Post: React.FC<PostProps> = ({
  coverImage,
  caption,
}: PostProps): JSX.Element => {
  const [showCommentSection, setShowCommentSection] = useState<boolean>(false);
  const [like, setLike] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);

  const RenderComment = ({comment}: {comment: string}): JSX.Element => {
    return (
      <View style={styles.commentRow}>
        <Image source={Avatar} style={styles.commentAvatar} />
        <Text style={styles.commentText}>{comment}</Text>
      </View>
    );
  };

  const RenderDescripton = ({
    description,
  }: {
    description: string;
  }): JSX.Element => {
    const [showCompleteDescription, setShowCompleteDescription] =
      useState<boolean>(false);
    if (description.length < 50 || showCompleteDescription)
      return <Text style={styles.descriptionTxt}>{description}</Text>;
    else
      return (
        <Text style={styles.descriptionTxtCover}>
          <Text>{description.slice(0, 40) + '... '}</Text>
          <TouchableOpacity
            onPress={() => setShowCompleteDescription(old => !old)}>
            <Text style={styles.readMore}>more</Text>
          </TouchableOpacity>
        </Text>
      );
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: coverImage}} style={styles.postCoverImage} />
      <View style={styles.actionBar}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={() => setLike(old => !old)}>
            <Image source={like ? Liked : Like} style={styles.like} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowCommentSection(old => !old)}>
            <Image source={CommentIconImg} style={styles.comment} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.rightActions}
          onPress={() => setSave(old => !old)}>
          <Image source={save ? Saved : Save} style={styles.save} />
        </TouchableOpacity>
      </View>
      <View style={styles.description}>
        <Text style={styles.likeCount}>0 likes</Text>
        <RenderDescripton description={caption} />
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
            <RenderComment comment="comment 1 goe here and there with lotment 1 goe here and there with lot ment 1 goe here and there with lots of love around" />
            <RenderComment comment="comment 2" />
            <RenderComment comment="comment 3" />
            <RenderComment comment="comment 4" />
            <RenderComment comment="comment 5" />
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
  postCoverImage: {
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
