import { modalConstants } from "../constants/modal.constants";
import { modalService } from "../services/modal.service";
import { toast } from 'react-toastify';

import history from '../routes/history'

export const modalActions = {
    get_all_modal,
    get_id_modal,
    update,
    get_all_active,

}

function get_all_active() {
    return dispatch => {
        dispatch(request());

        modalService.get_all_active()
            .then(
                modals => {
                    dispatch(success(modals));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: modalConstants.GET_ALL_ACTIVE_REQUEST } }
    function success(modals) { return { type: modalConstants.GET_ALL_ACTIVE_SUCCESS, modals } }
    function failure(error) { return { type: modalConstants.GET_ALL_ACTIVE_FAILURE, error } }
}


function get_all_modal() {
    return dispatch => {
        dispatch(request());

        modalService.get_all_modal()
            .then(
                modals => {
                    dispatch(success(modals));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: modalConstants.GET_ALL_REQUEST } }
    function success(modals) { return { type: modalConstants.GET_ALL_SUCCESS, modals } }
    function failure(error) { return { type: modalConstants.GET_ALL_FAILURE, error } }
}

function get_id_modal(id) {
    return dispatch => {
        dispatch(request());

        modalService.get_id_modal(id)
            .then(
                modal => {
                    dispatch(success(modal));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: modalConstants.GET_ID_REQUEST } }
    function success(modal) { return { type: modalConstants.GET_ID_SUCCESS, modal } }
    function failure(error) { return { type: modalConstants.GET_ID_FAILURE, error } }
}

function update(modal) {
    return dispatch => {
        dispatch(request(modal));

        modalService.update(modal)
            .then(
                modal => {
                    toast.success("Client Updated! 😎👍 ")
                    dispatch(success(modal));
                    //history.push('/login');
                },
                error => {
                    toast.error('Client Update Failed 😲😭 ', error.data.error)
                    dispatch(failure(error));
                }
            );
    };

    function request(modal) { return { type: modalConstants.UPDATE_REQUEST, modal } }
    function success(modal) { return { type: modalConstants.UPDATE_SUCCESS, modal } }
    function failure(error) { return { type: modalConstants.UPDATE_FAILURE, error } }
}
