import axios from 'axios';
import history from '../routes/history'

export const userService={

    login,
    logout,
}
async function login(){

    return new Promise(function(resolve, reject) {
        axios.get('api/user').then(function (response) {

            console.log("hello")
            console.log(response.data)
            resolve(response.data.user);


            // localStorage.setItem('user');

        })
            .catch(error => {
                    if (error.response) {
                        console.log(error.response)
                        reject(error.response);
                    }
                }
            )
    })
}
async function logout(){

    return new Promise(function(resolve, reject) {
        axios.post('api/user/logout').then(function (response) {
            resolve(response);
        })
            .catch(error => {
                    if (error.response) {
                        reject(error.response);
                        console.log(error.response)
                    }
                }
            )
    })
}