import { CHANGE_USER,CHANGE_POSTS } from './types';
import {commonReduxAction,stateType} from "../Types";


const initialState:stateType = {
    user: null,
    posts:[]
};

const appReducer = (state:stateType = initialState, action:commonReduxAction) => {
    switch(action.type) {
        case CHANGE_USER:
            return {
                ...state,
                user:action.payload
            };
        case CHANGE_POSTS:
            return {
                ...state,
                posts:action.payload
            };
        default:
        return state;
    }
}
export default appReducer;