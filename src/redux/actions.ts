import { CHANGE_USER } from './types';
import {userObjectDataType,userReduxAction} from "../Types";
    
export function changeUser(user:userObjectDataType):userReduxAction {
    return {
        type: CHANGE_USER,
        payload: user
    }
}