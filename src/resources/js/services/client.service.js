import axios from 'axios';

export const clientService={
    update,
    get_all_client,
    get_id_client,
}

async function update(client){

    return new Promise(function(resolve, reject) {

        axios.put('/api/client/' + client.id, {
            AddLine1: client.Address1,
            AddLine2: client.Address2,
            AddLine3: client.Address3,
            PostalCode: client.PostalCode,
            CountryId: 1,
            AddressTemplateID: client.AddressTemplateID,
            AddressID:client.AddressID,
            AddressTypeID: client.AddressTypeID,
            Status: client.Status,

        }).then(function (response) {
            resolve(response.data.client);

        })   .catch(error => {
            if (error.response) {
                console.log(error.response)
                reject(error.response);
            }
        });
    })
}

async function get_all_client(){

    return new Promise(function(resolve, reject) {
        axios.get('/api/client')
            .then(function (response) {
                    resolve(response.data.clients);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}

async function get_id_client(id){

    return new Promise(function(resolve, reject) {

        axios.get('/api/client/'+id)
            .then(function (response) {
                resolve(response.data.client);

            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}