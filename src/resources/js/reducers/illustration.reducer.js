import { formConstants } from "../constants/form.constants";
import { combineReducers } from 'redux'

export function checked(state = {}, action) {
    switch (action.type) {
        case formConstants.GET_TEMPLATE_ID_REQUEST:
            return {
                loading: true,
            };

        case formConstants.GET_TEMPLATE_ID_SUCCESS:
            return {
                forms: action.form
            };

        case formConstants.GET_TEMPLATE_ID_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}

export function initialize(state = {}, action) {
    switch (action.type) {
        case formConstants.GET_ID_REQUEST:
            return {
                loading: true,
            };

        case formConstants.GET_ID_SUCCESS:
            return {
                form: action.form.form[0],
                formAttributes: action.form.formAttributes
            };

        case formConstants.GET_ID_FAILURE:
            return {
                error: action.error
            };

        case formConstants.GET_MODAL_ID_REQUEST:
            return {
                loading: true,
            };

        case formConstants.GET_MODAL_ID_SUCCESS:
            return {
                forms: action.form
            };

        case formConstants.GET_MODAL_ID_FAILURE:
            return {
                error: action.error
            };

        case formConstants.GET_DATA_ID_REQUEST:
            return {
                loading: true,
            };

        case formConstants.GET_DATA_ID_SUCCESS:
            return {
                form: action.form.form[0],
                formAttributes: action.form.formAttributes
            };

        case formConstants.GET_DATA_ID_FAILURE:
            return {
                error: action.error
            };

        case formConstants.GET_ALL_REQUEST:
            return {
                loading: true
            };

        case formConstants.GET_ALL_SUCCESS:
            return {
                forms: action.forms
            };

        case formConstants.GET_ALL_FAILURE:
            return {
                error: action.error
            };
        default:
            return state;
    }
}

export function form(state = {}, action) {

    switch (action.type) {

        case formConstants.ADD_ON_TEMPLATE_REQUEST:
            return {
                loading: true,
            };

        case formConstants.ADD_ON_TEMPLATE_SUCCESS:
            return {
                form: action.form
            };

        case formConstants.ADD_ON_TEMPLATE_FAILURE:
            return {
                error: action.error
            };

        case formConstants.ADD_DATA_REQUEST:
            return {
                loading: true,
            };

        case formConstants.ADD_DATA_SUCCESS:
            return {
                form: action.form
            };

        case formConstants.ADD_DATA_FAILURE:
            return {
                error: action.error
            };

        case formConstants.ADD_REQUEST:
            return {
                loading: true,
            };

        case formConstants.ADD_SUCCESS:
            return {
                form: action.form
            };

        case formConstants.ADD_FAILURE:
            return {
                error: action.error
            };

        case formConstants.UPDATE_REQUEST:
            return {
                loading: true
            };

        case formConstants.UDPATE_SUCCESS:
            return {
                form: action.form
            };

        case formConstants.UPDATE_FAILURE:
            return {
                error: action.error
            };

        case formConstants.FORM_DATA_UPDATE_REQUEST:
            return {
                loading: true
            };

        case formConstants.FORM_DATA_UPDATE_SUCCESS:
            return {
                form: action.form
            };

        case formConstants.FORM_DATA_UPDATE_FAILURE:
            return {
                error: action.error
            };


        default:
            return state;

    }
}

export const formReducer = combineReducers({
    checked,
    initialize,
    form
})