import { templateConstants } from "../constants/template.constants";
import { combineReducers } from 'redux'

export function initialize(state = {}, action) {
    switch (action.type) {
        case templateConstants.GET_ID_REQUEST:
            return {
                loading: true,
            };

        case templateConstants.GET_ID_SUCCESS:
            return {
                template: action.template,
            };

        case templateConstants.GET_ID_FAILURE:
            return {
                error: action.error
            };

        case templateConstants.GET_MODAL_ID_REQUEST:
            return {
                loading: true,
            };

        case templateConstants.GET_MODAL_ID_SUCCESS:
            return {
                templates: action.template
            };

        case templateConstants.GET_MODAL_ID_FAILURE:
            return {
                error: action.error
            };

        case templateConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };

        case templateConstants.GET_ALL_SUCCESS:
            return {
                templates: action.templates
            };

        case templateConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}

export function template(state = {}, action) {

    switch (action.type) {

        case templateConstants.ADD_REQUEST:
            return {
                loading: true,
            };

        case templateConstants.ADD_SUCCESS:
            return {
                template: action.company
            };

        case templateConstants.ADD_FAILURE:
            return {
                error: action.error
            };

        case templateConstants.UPDATE_REQUEST:
            return {
                loading: true
            };

        case templateConstants.UDPATE_SUCCESS:
            return {
                template: action.company
            };

        case templateConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };


        default:
            return state;

    }
}

export const templateReducer = combineReducers({
    initialize,
    template
})