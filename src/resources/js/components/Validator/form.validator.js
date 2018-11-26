import {numeric,decimal,barcode,email} from './regrex.validator'

const formValidator = {
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
    type: {
        rules: [
        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: true,
            message: "Type is mandatory",
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
    online: {
        rules: [
        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: '',
            message: "Online is mandatory",
        }
        ],

    },
    status: {
        rules: [
        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: '',
            message: "Online is mandatory",
        }
        ],

    },
    day: {
        rules: [
        ],
        errors: [],
        valid: false,
        state: '',
        mandatory: [{
            value: '',
            message: "Day is mandatory",
        }
        ],

    },
}

export default formValidator;