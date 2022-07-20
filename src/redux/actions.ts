import { CHANGE_USER } from './types';
    export function changeUser(user) {
    return {
        type: CHANGE_USER,
        payload: user
    }
}