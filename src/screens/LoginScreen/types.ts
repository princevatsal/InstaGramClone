import {NavigationProp, ParamListBase} from '@react-navigation/native';
export  interface LogInProp {
    navigation: NavigationProp<ParamListBase>;
  }
export type nameErrorType = true | {errorMessage: string};