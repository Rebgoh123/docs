import { clientConstants } from "../constants/client.constants";
import { combineReducers } from 'redux'

export function initialize(state = {}, action) {
    switch (action.type) {
        case clientConstants.GET_ID_REQUEST:
            return {
                loading: true,
            };

        case clientConstants.GET_ID_SUCCESS:
            return {
                client: action.client
            };

        case clientConstants.GET_ID_FAILURE:
            return {
                error: action.error
            };

        case clientConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };

        case clientConstants.GET_ALL_SUCCESS:
            return {
                clients: action.clients
            };

        case clientConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}

export function client(state = {}, action) {

    switch (action.type) {

        case clientConstants.ADD_REQUEST:
            return {
                loading: true,
            };

        case clientConstants.ADD_SUCCESS:
            return {
                client: action.company
            };

        case clientConstants.ADD_FAILURE:
            return {
                error: action.error
            };

        case clientConstants.UPDATE_REQUEST:
            return {
                loading: true
            };

        case clientConstants.UDPATE_SUCCESS:
            return {
                client: action.company
            };

        case clientConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };


        default:
            return state;

    }
}

export const clientReducer = combineReducers({
    initialize,
    client
})