import {nameErrorType} from '../Types';
import firestore from '@react-native-firebase/firestore';
import {userObjectDataType} from '../Types';

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
        console.log(err, 'error');
      });
  });
};

export const setUserDetails = async (
  name: string,
  phoneNo: string,
  uid: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection('Users')
      .doc(phoneNo)
      .set({
        name,
        phoneNo,
        uid,
      })
      .then(() => {
        console.log('User added!');
        resolve('success');
      })
      .catch(err => {
        console.log(err);
        reject();
      });
  });
};

export const getUserDetails = async (
  phoneNo: string,
): Promise<userObjectDataType> => {
  return new Promise((resolve, reject) => {
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
        else reject();
      })
      .catch(err => {
        reject();
      });
  });
};
