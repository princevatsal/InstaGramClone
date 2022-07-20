import {NavigationProp, ParamListBase} from '@react-navigation/native';

export type nameErrorType = true | {errorMessage: string};

export type userObjectDataType = {uid: string; name: string; phoneNo: string} | null;

export type userReduxAction={
  type:string,
  payload:userObjectDataType,
}
export type commonReduxAction={
  type:string,
  payload:any,
}

export type stateType={user:userObjectDataType};

export interface ProfileScreenProp {
  navigation: NavigationProp<ParamListBase>;
  user:userObjectDataType,
  setUserObject:any,
}
export interface SignUpPageProp {
  navigation: NavigationProp<ParamListBase>;
  setUserObject:any,
};
export interface MainStackPageProp {
  user:userObjectDataType,
  setUserObject:any,
};
export interface NewPostPageProp {
  navigation: NavigationProp<ParamListBase>;
}