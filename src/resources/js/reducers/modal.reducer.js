import { modalConstants } from "../constants/modal.constants";
import { combineReducers } from 'redux'

export function initialize(state = {}, action) {
    switch (action.type) {
        case modalConstants.GET_ID_REQUEST:
            return {
                loading: true,
            };

        case modalConstants.GET_ID_SUCCESS:
            return {
                modal: action.modal
            };

        case modalConstants.GET_ID_FAILURE:
            return {
                error: action.error
            };

        case modalConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };

        case modalConstants.GET_ALL_SUCCESS:
            return {
                modals: action.modals
            };

        case modalConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };

        case modalConstants.GET_ALL_ACTIVE_REQUEST:
            return {
                loading: true
            };

        case modalConstants.GET_ALL_ACTIVE_SUCCESS:
            return {
                modals: action.modals
            };

        case modalConstants.GET_ALL_ACTIVE_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}

export function modal(state = {}, action) {

    switch (action.type) {

        case modalConstants.ADD_REQUEST:
            return {
                loading: true,
            };

        case modalConstants.ADD_SUCCESS:
            return {
                modal: action.modal
            };

        case modalConstants.ADD_FAILURE:
            return {
                error: action.error
            };

        case modalConstants.UPDATE_REQUEST:
            return {
                loading: true
            };

        case modalConstants.UDPATE_SUCCESS:
            return {
                modal: action.modal
            };

        case modalConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };


        default:
            return state;

    }
}

export const modalReducer = combineReducers({
    initialize,
    modal
})