import axios from 'axios';
import {convertToRaw} from "draft-js";

export const templateService={
    create,
    update,
    get_all_template,
    get_id_template,
    get_id_modal_template
}

async function create(template){

    return new Promise(function(resolve, reject) {


        console.log(template[1])
        axios.post('/api/template/create', {
            name:template[0]['name'],
            description:template[0]['description'],
            modal:template[0]['select'],
            type:0,
            templateContent:JSON.stringify(template[1]),


        }).then(function (response) {
            resolve(response.data.template);

        })   .catch(error => {
            if (error.response) {
                console.log(error.response)
                reject(error.response);
            }
        });
    })
}

async function update(template){

    return new Promise(function(resolve, reject) {

        axios.put('/api/template/' + template[0].id, {
            title:template[0]['title'],
            name:template[0]['name'],
            description:template[0]['description'],
            type:0,
            templateContent:JSON.stringify(template[1]),

        }).then(function (response) {
            resolve(response.data.template);

        })   .catch(error => {
            if (error.response) {
                console.log(error.response)
                reject(error.response);
            }
        });
    })
}

async function get_all_template(){

    return new Promise(function(resolve, reject) {
        axios.get('/api/template')
            .then(function (response) {
                    resolve(response.data.templates);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}

async function get_id_template(id){

    return new Promise(function(resolve, reject) {

        axios.get('/api/template/'+id)
            .then(function (response) {
                resolve(response.data.template);

            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}

async function get_id_modal_template(id){

    return new Promise(function(resolve, reject) {

        axios.get('/api/template/modal/'+id)
            .then(function (response) {
                resolve(response.data.template);

            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}