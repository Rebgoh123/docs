import axios from 'axios';

export const formService={
    create_form_template,
    create,
    update,
    get_all_form,
    get_id_form,
    get_id_modal_form,
    get_id_template_form,
    get_form_data,
    get_form_type,
    create_form_data,
    update_form_data,
    get_client_form_data,

}

async function get_form_data(form){

    return new Promise(function(resolve, reject) {

        axios.post('/api/data/get', {
            formDataID:form[0].formDataID,
            formID:form[1].formID,

        }).then(function (response) {
            resolve(response.data.form);

        })   .catch(error => {
            if (error.response) {
                console.log(error.response)
                reject(error.response);
            }
        });
    })
}

async function get_client_form_data(form){

    var formId = form[0].formId;
    var entityId = form[1].EntityId;

    return new Promise(function(resolve, reject) {
        axios.post('/api/data/client', {
            entityId:entityId,
            formId:formId,

        }).then(function (response) {

            if(response.data.form.length>0){

                var form
                form = response.data.form[0];

                var data,result
                data= get_form_data([{'formDataID':form.id},{'formID':form.Form_Id}])

                resolve(data);

            }else{
                var data,result
                data= get_id_form(formId)
                resolve(data);
            }


        })   .catch(error => {
            if (error.response) {
                console.log(error.response)
                reject(error.response);
            }
        });

    })
}

async function get_form_type(){

    return new Promise(function(resolve, reject) {

        axios.get('/api/form/get/type')
            .then(function (response) {
                resolve(response.data.forms);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}

async function get_id_template_form(id){

    return new Promise(function(resolve, reject) {

        axios.get('/api/form/template/'+id)
            .then(function (response) {
                resolve(response.data.form);

            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });

    })
}

async function create_form_template(form){

    return new Promise(function(resolve, reject) {

        axios.post('/api/form/create/form/template', {
            formName:form[0].name,
            formDescription:form[0].description,
            formModal:form[0].modal,
            size:form[1].length,
            type:form[0].type,
            online:form[0].online,
            day:form[0].day,
            attributes:form[1],
            templateName:form[2]['name'],
            templateDescription:form[2]['description'],
            templateModal:form[2]['modal'],

            templateContent:JSON.stringify(form[3]),

        }).then(function (response) {
            resolve(response.data.form);

        })   .catch(error => {
            if (error.response) {
                console.log(error.response)
                reject(error.response);
            }
        });
    })
}

async function update_form_data(form){

    console.log(form)
    console.log(form[2].formID)
    console.log(form[0].variable.id)
    console.log(form[1].newItems)

    return new Promise(function(resolve, reject) {

        axios.put('/api/data/' + form[3].formDataID, {
            formID:form[2].formID,
            entityID:form[0].variable.id,
            value:form[1].newItems,

        }).then(function (response) {
            resolve(response.data.form);

        })   .catch(error => {
            if (error.response) {
                console.log(error.response)
                reject(error.response);
            }
        });
    })
}



async function create_form_data(form){

    return new Promise(function(resolve, reject) {
        console.log(form[2].formID)
        console.log(form[0].variable.id)
        console.log(form[1].newItems)

        axios.post('/api/data/create', {
            formID:form[2].formID,
            entityID:form[0].variable.id,
            value:form[1].newItems,

        }).then(function (response) {
            resolve(response.data.form);

        })   .catch(error => {
            if (error.response) {
                reject(error.response);
            }
        });
    })
}

async function create(form){

    return new Promise(function(resolve, reject) {

        axios.post('/api/form/create', {
            name:form[0].name,
            description:form[0].description,
            size:form[1].length,
            modal:form[0].modal,
            type:form[0].type,
            online:form[0].online,
            day:form[0].day,
            attributes:form[1]

        }).then(function (response) {
            resolve(response.data.form);

        })   .catch(error => {
            if (error.response) {
                console.log(error.response)
                reject(error.response);
            }
        });
    })
}

async function update(form){

    console.log(form)
    return new Promise(function(resolve, reject) {

        axios.put('/api/form/' + form[0].id, {
            name:form[0].name,
            description:form[0].description,
            size:form[1].length,
            modal:form[0].modal,
            type:form[0].type,
            online:form[0].online,
            day:form[0].day,
            status:form[0].status,
            attributes:form[1]

        }).then(function (response) {
            resolve(response.data.form);

        })   .catch(error => {
            if (error.response) {
                console.log(error.response)
                reject(error.response);
            }
        });
    })
}

async function get_all_form(){

    return new Promise(function(resolve, reject) {
        axios.get('/api/form')
            .then(function (response) {
                resolve(response.data.forms);
            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}

async function get_id_form(id){

    return new Promise(function(resolve, reject) {

        axios.get('/api/form/'+id)
            .then(function (response) {
                resolve(response.data.form);

            })
            .catch(error => {
                if (error.response) {
                    console.log(error.response)
                    reject(error.response);
                }
            });
    })
}

async function get_id_modal_form(form){

    return new Promise(function(resolve, reject) {

        axios.post('/api/form/modal', {
            modal_id:form[0].modal_id,
            entity_id:form[1].entity_id,

        }).then(function (response) {
            resolve(response.data.form);

        })   .catch(error => {
            if (error.response) {
                console.log(error.response)
                reject(error.response);
            }
        });

    })
}