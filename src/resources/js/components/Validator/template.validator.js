import {numeric,decimal,barcode,email} from './regrex.validator'

const templateValidator = {
    name: {
        rules: [
            {
                test: (value) => {
                    return value.length < 255;
                },
                message: 'Title should be less then 255 character',
            },

        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: true,
            message: "Title is mandatory",
        }
        ],

    },
    description: {
        rules: [
            {
                test: (value) => {
                    return value.length < 500;
                },
                message: 'Description should be less then 255 character',
            },

        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: true,
            message: "Description is mandatory",
        }
        ],

    },
    modal: {
        rules: [
        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: true,
            message: "Modal is mandatory",
        }
        ],

    },
}

export default templateValidator;