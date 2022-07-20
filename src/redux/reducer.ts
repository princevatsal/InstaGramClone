import { CHANGE_USER } from './types';
import {userObjectDataType,commonReduxAction,stateType} from "../Types";


const initialState:stateType = {
    user: null
};

const appReducer = (state:stateType = initialState, action:commonReduxAction) => {
    switch(action.type) {
        case CHANGE_USER:
            return {
                ...state,
                user:action.payload
            };
        default:
        return state;
    }
}
export default appReducer;