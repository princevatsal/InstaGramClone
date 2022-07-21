import { CHANGE_USER,CHANGE_POSTS } from './types';
import {postObjectDataType, userObjectDataType,userReduxAction,postsReduxAction} from "../Types";
    
export function changeUser(user:userObjectDataType):userReduxAction {
    return {
        type: CHANGE_USER,
        payload: user
    }
}
export function changePosts(posts:postObjectDataType[]):postsReduxAction {
    return {
        type: CHANGE_POSTS,
        payload: posts,
    }
}