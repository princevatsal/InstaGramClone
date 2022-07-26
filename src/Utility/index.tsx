import {nameErrorType} from '../Types';
import firestore from '@react-native-firebase/firestore';
import {userObjectDataType, postObjectDataType} from '../Types';
import storage from '@react-native-firebase/storage';

export const validateName = (name: string): nameErrorType => {
  name = name.trim();
  if (name.length == 0) {
    return {errorMessage: 'Please enter your name'};
  } else if (name.length > 30) {
    return {errorMessage: 'Name can not be of more than 30 characters'};
  } else {
    return true;
  }
};

export const checkUserExists = async (phoneNo: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .where('phoneNo', '==', phoneNo)
      .get()
      .then(docs => {
        resolve(docs.docs.length >= 1);
      })
      .catch(err => {
        reject();
      });
  });
};

export const setUserDetails = async (
  name: string,
  phoneNo: string,
  uid: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (
      !name ||
      name.trim() == '' ||
      !phoneNo ||
      phoneNo.trim() == '' ||
      !uid ||
      uid.trim() == ''
    ) {
      reject('error');
    } else
      firestore()
        .collection('Users')
        .doc(phoneNo)
        .set({
          name,
          phoneNo,
          uid,
        })
        .then(() => {
          resolve('success');
        })
        .catch(err => {
          reject('error');
        });
  });
};

export const getUserDetails = async (
  phoneNo: string,
): Promise<userObjectDataType> => {
  return new Promise((resolve, reject) => {
    if (!phoneNo || phoneNo.trim() == '') {
      reject('error');
    } else
      firestore()
        .collection('Users')
        .doc(phoneNo)
        .get()
        .then(data => {
          const result = data.data();
          if (result != undefined)
            resolve({
              name: result.name,
              uid: result.uid,
              phoneNo: result.phoneNo,
            });
          else reject('no user exists with this phone no');
        })
        .catch(err => {
          reject('error');
        });
  });
};

export const getPosts = async (): Promise<postObjectDataType[]> => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Posts')
      .get()
      .then(data => {
        const result = data.docs.map(doc => doc.data());

        if (result && result.length > 0) {
          const tempPosts = result.map(item => ({
            caption: item.caption,
            coverImage: item.coverImage,
            user: item.user,
            id: item.id,
          }));
          resolvePostsImageUrls(tempPosts)
            .then(finalPosts => {
              resolve(finalPosts);
            })
            .catch(err => {
              resolve(tempPosts);
            });
        } else {
          reject();
        }
      })
      .catch(err => {
        reject();
      });
  });
};

export const resolvePostsImageUrls = async (
  posts: postObjectDataType[],
): Promise<postObjectDataType[]> => {
  return new Promise((resolve, reject) => {
    const promisesList = getPromiseListOfResolvedUrlPosts(posts);
    Promise.all(promisesList)
      .then((finalPosts: postObjectDataType[]) => {
        resolve(finalPosts);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getPromiseListOfResolvedUrlPosts = (
  posts: postObjectDataType[],
): Promise<postObjectDataType>[] => {
  return posts.map(async post => {
    return new Promise(resolve => {
      const fullPath: string = post.coverImage;
      storage()
        .ref(fullPath)
        .getDownloadURL()
        .then(url => {
          resolve({
            ...post,
            coverImage: url,
          });
        })
        .catch(err => {
          resolve(post);
        });
    });
  });
};
