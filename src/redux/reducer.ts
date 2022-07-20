import { CHANGE_USER } from './types';
const initialState = {
    user: null
};
const appReducer = (state = initialState, action) => {
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