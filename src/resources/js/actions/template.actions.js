import { templateConstants } from "../constants/template.constants";
import { templateService } from "../services/template.service";
import { toast } from 'react-toastify';

import history from '../routes/history'

export const templateActions = {
    get_all_template,
    get_id_template,
    get_id_modal_template,
    update,
    create

}
function create(template) {
    return dispatch => {
        dispatch(request(template));

        templateService.create(template)
            .then(
                template => {
                    toast.success("Template Created! 😄✌️ ")
                    dispatch(success(template));
                    //console.log(template)
                    history.push('/web/template/get/' + template.id);
                },
                error => {
                    toast.error('Template creation failed 😫😓 ', error.data.error)
                    dispatch(failure(error));
                }
            );
    };

    function request(template) { return { type: templateConstants.ADD_REQUEST, template } }
    function success(template) { return { type: templateConstants.ADD_SUCCESS, template } }
    function failure(error) { return { type: templateConstants.ADD_FAILURE, error } }
}

function get_all_template() {
    return dispatch => {
        dispatch(request());

        templateService.get_all_template()
            .then(
                templates => {
                    dispatch(success(templates));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: templateConstants.GET_ALL_REQUEST } }
    function success(templates) { return { type: templateConstants.GET_ALL_SUCCESS, templates } }
    function failure(error) { return { type: templateConstants.GET_ALL_FAILURE, error } }
}

function get_id_modal_template(id) {
    return dispatch => {
        dispatch(request());

        templateService.get_id_modal_template(id)
            .then(
                template => {
                    dispatch(success(template));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: templateConstants.GET_MODAL_ID_REQUEST } }
    function success(template) { return { type: templateConstants.GET_MODAL_ID_SUCCESS, template } }
    function failure(error) { return { type: templateConstants.GET_MODAL_ID_FAILURE, error } }
}

function get_id_template(id) {
    return dispatch => {
        dispatch(request());

        templateService.get_id_template(id)
            .then(
                template => {
                    dispatch(success(template));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: templateConstants.GET_ID_REQUEST } }
    function success(template) { return { type: templateConstants.GET_ID_SUCCESS, template } }
    function failure(error) { return { type: templateConstants.GET_ID_FAILURE, error } }
}

function update(template) {
    return dispatch => {
        dispatch(request(template));

        templateService.update(template)
            .then(
                template => {
                    toast.success("Template Updated! 😎👍 ")
                    dispatch(success(template));
                    history.push('/web/template/get/' + template.id);
                },
                error => {
                    toast.error('Template Update Failed 😲😭 ', error.data.error)
                    dispatch(failure(error));
                }
            );
    };

    function request(template) { return { type: templateConstants.UPDATE_REQUEST, template } }
    function success(template) { return { type: templateConstants.UPDATE_SUCCESS, template } }
    function failure(error) { return { type: templateConstants.UPDATE_FAILURE, error } }
}
