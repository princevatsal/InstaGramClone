import {NavigationProp, ParamListBase} from '@react-navigation/native';

export type nameErrorType = true | {errorMessage: string};

export type userObjectDataType = {uid: string; name: string; phoneNo: string} | null;
export type postObjectDataType= {id:string,coverImage:string,caption:string,user:{uid:"string",name:"string"}}
export type userReduxAction={
  type:string,
  payload:userObjectDataType,
}
export type postsReduxAction={
  type:string,
  payload:postObjectDataType[],
}
export type commonReduxAction={
  type:string,
  payload:any,
}

export type stateType={user:userObjectDataType,posts:postObjectDataType[]};

export interface ProfileScreenProp {
  navigation: NavigationProp<ParamListBase>;
  user:userObjectDataType,
  setUserObject:any,
  posts:postObjectDataType[]
}
export interface SignUpPageProp {
  navigation: NavigationProp<ParamListBase>;
  setUserObject:any,
  setPostsArray:any,
};
export interface MainStackPageProp {
  user:userObjectDataType,
  setUserObject:any,
  setPostsArray:any,
};
export interface NewPostPageProp {
  navigation: NavigationProp<ParamListBase>;
  user:userObjectDataType;
  setPostsArray:any;
}