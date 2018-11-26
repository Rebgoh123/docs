import {numeric,decimal,barcode,email} from './regrex.validator'
import productValidator from "./product.validator";

const userValidator = {
    name: {
        rules: [
            {
                test: (value) => {
                    return value.length < 255;
                },
                message: 'Name should be less then 255 character',
            },

        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: true,
            message: "Name is mandatory",
        }
        ],

    },
    username: {
        rules: [
            {
                test: (value) => {
                    return value.length < 255;
                },
                message: 'Username should be less then 255 character',
            },

        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: true,
            message: "Username is mandatory",
        }
        ],

    },
    email: {
        rules: [
            {
                test: email,
                message: 'Email format is invalid',
            },

        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: true,
            message: "Email is mandatory",
        }
        ],

    },
    password: {
        rules: [
            {},

        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: true,
            message: "Password is mandatory",
        }
        ],

    }, confirmed_password: {
        rules: [
            {
                test: (value, confirmed_password) => {
                    return (value == confirmed_password);
                },
                message: 'Password Mismatch',
            },

        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: true,
            message: "Password is mandatory",

        }],
    },
}

export default userValidator;