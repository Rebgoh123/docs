import { accountConstants } from "../constants/account.constants";
import { combineReducers } from 'redux'

export function initialize(state = {}, action) {
    switch (action.type) {
        case accountConstants.GET_ID_REQUEST:
            return {
                loading: true,
            };

        case accountConstants.GET_ID_SUCCESS:
            return {
                account: action.account
            };

        case accountConstants.GET_ID_FAILURE:
            return {
                error: action.error
            };

        case accountConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };

        case accountConstants.GET_ALL_SUCCESS:
            return {
                accounts: action.accounts
            };

        case accountConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}

export function account(state = {}, action) {

    switch (action.type) {

        case accountConstants.ADD_REQUEST:
            return {
                loading: true,
            };

        case accountConstants.ADD_SUCCESS:
            return {
                account: action.company
            };

        case accountConstants.ADD_FAILURE:
            return {
                error: action.error
            };

        case accountConstants.UPDATE_REQUEST:
            return {
                loading: true
            };

        case accountConstants.UDPATE_SUCCESS:
            return {
                account: action.company
            };

        case accountConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };


        default:
            return state;

    }
}

export const accountReducer = combineReducers({
    initialize,
    account
})