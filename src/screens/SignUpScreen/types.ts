import {NavigationProp, ParamListBase} from '@react-navigation/native';
export  interface SignUpProp {
    navigation: NavigationProp<ParamListBase>;
  }
export type nameErrorType = true | {errorMessage: string};