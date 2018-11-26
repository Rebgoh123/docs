import { accountConstants } from "../constants/account.constants";
import { accountService } from "../services/account.service";
import { toast } from 'react-toastify';

import history from '../routes/history'

export const accountActions = {
    get_all_account,
    get_id_account,
    update

}

function get_all_account() {
    return dispatch => {
        dispatch(request());

        accountService.get_all_account()
            .then(
                accounts => {
                    dispatch(success(accounts));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: accountConstants.GET_ALL_REQUEST } }
    function success(accounts) { return { type: accountConstants.GET_ALL_SUCCESS, accounts } }
    function failure(error) { return { type: accountConstants.GET_ALL_FAILURE, error } }
}

function get_id_account(id) {
    return dispatch => {
        dispatch(request());

        accountService.get_id_account(id)
            .then(
                account => {
                    dispatch(success(account));
                },
                error => {
                    dispatch(failure(error.data.error));
                }
            );
    };

    function request() { return { type: accountConstants.GET_ID_REQUEST } }
    function success(account) { return { type: accountConstants.GET_ID_SUCCESS, account } }
    function failure(error) { return { type: accountConstants.GET_ID_FAILURE, error } }
}

function update(account) {
    return dispatch => {
        dispatch(request(account));

        accountService.update(account)
            .then(
                account => {
                    toast.success("Client Updated! 😎👍 ")
                    dispatch(success(account));
                    //history.push('/login');
                },
                error => {
                    toast.error('Client Update Failed 😲😭 ', error.data.error)
                    dispatch(failure(error));
                }
            );
    };

    function request(account) { return { type: accountConstants.UPDATE_REQUEST, account } }
    function success(account) { return { type: accountConstants.UPDATE_SUCCESS, account } }
    function failure(error) { return { type: accountConstants.UPDATE_FAILURE, error } }
}
