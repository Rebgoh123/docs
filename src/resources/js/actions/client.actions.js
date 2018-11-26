import { clientConstants } from "../constants/client.constants";
import { clientService } from "../services/client.service";
import { toast } from 'react-toastify';

import history from '../routes/history'

export const clientActions = {
    get_all_client,
    get_id_client,
    update

}

function get_all_client() {
    return dispatch => {
        dispatch(request());

        clientService.get_all_client()
            .then(
                clients => {
                    dispatch(success(clients));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: clientConstants.GET_ALL_REQUEST } }
    function success(clients) { return { type: clientConstants.GET_ALL_SUCCESS, clients } }
    function failure(error) { return { type: clientConstants.GET_ALL_FAILURE, error } }
}

function get_id_client(id) {
    return dispatch => {
        dispatch(request());

        clientService.get_id_client(id)
            .then(
                client => {
                    dispatch(success(client));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: clientConstants.GET_ID_REQUEST } }
    function success(client) { return { type: clientConstants.GET_ID_SUCCESS, client } }
    function failure(error) { return { type: clientConstants.GET_ID_FAILURE, error } }
}

function update(client) {
    return dispatch => {
        dispatch(request(client));

        clientService.update(client)
            .then(
                client => {
                    toast.success("Client Updated! 😎👍 ")
                    dispatch(success(client));
                    //history.push('/login');
                },
                error => {
                    toast.error('Client Update Failed 😲😭 ', error.data.error)
                    dispatch(failure(error));
                }
            );
    };

    function request(client) { return { type: clientConstants.UPDATE_REQUEST, client } }
    function success(client) { return { type: clientConstants.UPDATE_SUCCESS, client } }
    function failure(error) { return { type: clientConstants.UPDATE_FAILURE, error } }
}
