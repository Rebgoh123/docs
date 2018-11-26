import { userConstants } from "../constants/user.constants";
import { combineReducers } from 'redux'

export function registration(state ={}, action) {

    switch (action.type) {

        case userConstants.REGISTER_REQUEST:
            return {
                registering: true
            };

        case userConstants.REGISTER_SUCCESS:
            return {

            };

        case userConstants.REGISTER_FAILURE:
            return {
                error: action.error
            };

        default:
            return state;
    }

}

let user = JSON.parse(localStorage.getItem('user'));
// let user =[];
const initialState = user ? {loggedIn:true, user} : {};

export function authentication(state = {initialState}, action){

    switch (action.type){

        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };

        case userConstants.LOGIN_SUCCESS:
            return{
                loggedIn:true,
                user:action.user
            };

        case userConstants.LOGIN_FAILURE:
            return{
                error:action.error
            };

        case userConstants.LOGOUT_REQUEST:
            return{
                loggingOut:true,
                user: action.user
            };
        case userConstants.LOGOUT_SUCCESS:
            return{
                loggingOut:true,
            };
        case userConstants.LOGOUT_FAILURE:
            return{
                error:action.error
            };

        default:
            return state;
    }
}

export function users(state = {}, action) {

    switch (action.type) {

        case userConstants.GETCURRENT_REQUEST:
            return {
                loading: true,
            };

        case userConstants.GETCURRENT_SUCCESS:
            return {
                user: action.user
            };

        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };

        case userConstants.GETALL_SUCCESS:
            return {
                users: action.users
            };

        case userConstants.GETALL_FAILURE:
            return {
                error: action.error
            };

        case userConstants.DELETE_REQUEST:
            return {
                ...state,
                users: state.users.map(user => user.id === action.id
                    ? {
                        ...user,
                        deleting: true
                    } : user
                )
            };

        case userConstants.DELETE_SUCCESS:
            return {
                users: state.users.filter(user => user.id !== action.id)
            };


        case userConstants.DELETE_FAILURE:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id !== action.id) {
                        const {deleting, ...userCopy} = user
                        return {
                            ...userCopy, deleteError: action.error
                        };
                    }
                    return user;
                })
            };

        default:
            return state;

    }
}

export const usersReducer = combineReducers({
    registration,
    authentication,
    users
})