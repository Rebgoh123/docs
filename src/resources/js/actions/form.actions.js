import { formConstants } from "../constants/form.constants";
import { formService } from "../services/form.service";
import { toast } from 'react-toastify';

import history from '../routes/history'
import axios from "axios";

export const formActions = {
    get_client_form_data,
    get_id_template_form,
    create_form_template,
    get_all_form,
    get_id_form,
    get_form_data,
    get_form_type,
    update,
    create,
    get_id_modal_form,
    create_form_data,
    update_form_data

}

function get_client_form_data(form) {
    return dispatch => {
        dispatch(request());

        formService.get_client_form_data(form)
            .then(
                form => {
                    console.log(form)
                        dispatch(success(form));

                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: formConstants.GET_CLIENT_DATA_REQUEST } }
    function success(form) { return { type: formConstants.GET_CLIENT_DATA_SUCCESS, form } }
    function failure(error) { return { type: formConstants.GET_CLIENT_DATA_FAILURE, error } }
}

function get_form_type() {
    return dispatch => {
        dispatch(request());

        formService.get_form_type()
            .then(
                forms => {
                    dispatch(success(forms));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: formConstants.GET_TYPE_REQUEST } }
    function success(forms) { return { type: formConstants.GET_TYPE_SUCCESS, forms } }
    function failure(error) { return { type: formConstants.GET_TYPE_FAILURE, error } }
}


function get_id_template_form(form) {
    return dispatch => {
        dispatch(request());

        formService.get_id_template_form(form)
            .then(
                form => {
                    dispatch(success(form));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: formConstants.GET_TEMPLATE_ID_REQUEST } }
    function success(form) { return { type: formConstants.GET_TEMPLATE_ID_SUCCESS, form } }
    function failure(error) { return { type: formConstants.GET_TEMPLATE_ID_FAILURE, error } }
}

function create_form_template(form) {
    return dispatch => {
        dispatch(request(form));

        formService.create_form_template(form)
            .then(
                form => {
                    toast.success("Form and Template Created! 😄✌️ ")
                    dispatch(success(form));
                    console.log(form)
                    // history.push('/form/' + form.id);

                    // history.push("/" +  this.props.model + "/" + row.id);
                },
                error => {
                    toast.error('Form and Template creation failed 😫😓 ', error.data.error)
                    dispatch(failure(error));
                }
            );
    };

    function request(form) { return { type: formConstants.ADD_ON_TEMPLATE_REQUEST, form } }
    function success(form) { return { type: formConstants.ADD_ON_TEMPLATE_SUCCESS, form } }
    function failure(error) { return { type: formConstants.ADD_ON_TEMPLATE_FAILURE, error } }
}

function update_form_data(form) {
    return dispatch => {
        dispatch(request(form));

        formService.update_form_data(form)
            .then(
                form => {
                    toast.success("Form Updated! 😎👍 ")
                    dispatch(success(form));
                },
                error => {
                    toast.error('Form Update Failed 😲😭 ', error.data.error)
                    dispatch(failure(error));
                }
            );
    };

    function request(form) { return { type: formConstants.UPDATE_DATA_REQUEST, form } }
    function success(form) { return { type: formConstants.UPDATE_DATA_SUCCESS, form } }
    function failure(error) { return { type: formConstants.UPDATE_DATA_FAILURE, error } }
}


function get_form_data(form) {
    return dispatch => {
        dispatch(request(form));

        formService.get_form_data(form)
            .then(
                form => {
                    dispatch(success(form));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: formConstants.GET_DATA_ID_REQUEST } }
    function success(form) { return { type: formConstants.GET_DATA_ID_SUCCESS, form } }
    function failure(error) { return { type: formConstants.GET_DATA_ID_FAILURE, error } }
}

function create_form_data(form) {
    return dispatch => {
        // console.log(form)

       var info = form[1]['variable']
       var model = form[3]['model']
        dispatch(request(form));

        formService.create_form_data(form)
            .then(
                form => {
                    toast.success("Form Submitted! 😄✌️ ")
                    dispatch(success(form));
                    //console.log(form)
                  history.push({pathname: '/web/' + model + '/get/' + form.Entity_id});
                  // history.push({pathname: '/web/form/modal/get/' + form.Form_id,  state: [{ detail:info },{formDataID: form.id},{model: model}]})



                },
                error => {
                    toast.error('Form failed to submit, please contact your administrator  😫😓 ', error.data.error)
                    dispatch(failure(error));
                }
            );
    };

    function request(form) { return { type: formConstants.ADD_REQUEST, form } }
    function success(form) { return { type: formConstants.ADD_SUCCESS, form } }
    function failure(error) { return { type: formConstants.ADD_FAILURE, error } }
}

function get_id_modal_form(form) {
    return dispatch => {
        dispatch(request());

        formService.get_id_modal_form(form)
            .then(
                form => {
                    dispatch(success(form));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: formConstants.GET_MODAL_ID_REQUEST } }
    function success(form) { return { type: formConstants.GET_MODAL_ID_SUCCESS, form } }
    function failure(error) { return { type: formConstants.GET_MODAL_ID_FAILURE, error } }
}

function create(form) {
    return dispatch => {
        dispatch(request(form));

        formService.create(form)
            .then(
                form => {
                    toast.success("Form Created! 😄✌️ ")
                    dispatch(success(form));
                    console.log(form)
                    history.push('/web/form/get/' + form.id);
                },
                error => {
                    toast.error('Form creation failed 😫😓 ', error.data.error)
                    dispatch(failure(error));
                }
            );
    };

    function request(form) { return { type: formConstants.ADD_REQUEST, form } }
    function success(form) { return { type: formConstants.ADD_SUCCESS, form } }
    function failure(error) { return { type: formConstants.ADD_FAILURE, error } }
}

function get_all_form() {
    return dispatch => {
        dispatch(request());

        formService.get_all_form()
            .then(
                forms => {
                    dispatch(success(forms));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: formConstants.GET_ALL_REQUEST } }
    function success(forms) { return { type: formConstants.GET_ALL_SUCCESS, forms } }
    function failure(error) { return { type: formConstants.GET_ALL_FAILURE, error } }
}

function get_id_form(id) {
    return dispatch => {
        dispatch(request());

        formService.get_id_form(id)
            .then(
                form => {
                    dispatch(success(form));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: formConstants.GET_ID_REQUEST } }
    function success(form) { return { type: formConstants.GET_ID_SUCCESS, form } }
    function failure(error) { return { type: formConstants.GET_ID_FAILURE, error } }
}



function update(form) {
    return dispatch => {
        dispatch(request(form));

        formService.update(form)
            .then(
                form => {
                    toast.success("Form Updated! 😎👍 ")
                    dispatch(success(form));
                    //history.push('/login');
                },
                error => {
                    toast.error('Form Update Failed 😲😭 ', error.data.error)
                    dispatch(failure(error));
                }
            );
    };

    function request(form) { return { type: formConstants.UPDATE_REQUEST, form } }
    function success(form) { return { type: formConstants.UPDATE_SUCCESS, form } }
    function failure(error) { return { type: formConstants.UPDATE_FAILURE, error } }
}

