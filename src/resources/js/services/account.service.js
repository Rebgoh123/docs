import axios from 'axios';

export const accountService={
    get_all_account,
    get_id_account,
}

async function get_all_account(){

    return new Promise(function(resolve, reject) {
        axios.get('/api/account')
            .then(function (response) {
                    resolve(response.data.accounts);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}

async function get_id_account(id){

    return new Promise(function(resolve, reject) {

        axios.get('/api/account/'+id)
            .then(function (response) {
                resolve(response.data.account);

            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}