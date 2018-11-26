import axios from 'axios';

export const modalService={
    update,
    get_all_modal,
    get_id_modal,
    get_all_active,
}

async function update(modal){

    return new Promise(function(resolve, reject) {

        // axios.put('/api/modal/' + modal.id, {
        //     AddLine1: modal.Address1,
        //     AddLine2: modal.Address2,
        //     AddLine3: modal.Address3,
        //     PostalCode: modal.PostalCode,
        //     CountryId: 1,
        //     AddressTemplateID: modal.AddressTemplateID,
        //     AddressID:modal.AddressID,
        //     AddressTypeID: modal.AddressTypeID,
        //     Status: modal.Status,
        //
        // }).then(function (response) {
        //     resolve(response.data.modal);
        //
        // })   .catch(error => {
        //     if (error.response) {
        //         console.log(error.response)
        //         reject(error.response);
        //     }
        // });
    })
}

async function get_all_modal(){

    return new Promise(function(resolve, reject) {
        // axios.get('/api/modal')
        //     .then(function (response) {
        //             resolve(response.data.modals);
        //     })
        //     .catch(error => {
        //         if (error.response) {
        //             console.log(error.response)
        //             reject(error.response);
        //         }
        //     });
    })
}


async function get_all_active(){

    return new Promise(function(resolve, reject) {
        axios.get('/api/modal/active')
            .then(function (response) {
                resolve(response.data.modals);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}

async function get_id_modal(id){

    return new Promise(function(resolve, reject) {
        //
        // axios.get('/api/modal/'+id)
        //     .then(function (response) {
        //         resolve(response.data.modal);
        //
        //     })
        //     .catch(error => {
        //         if (error.response) {
        //             console.log(error.response)
        //             reject(error.response);
        //         }
        //     });
    })
}