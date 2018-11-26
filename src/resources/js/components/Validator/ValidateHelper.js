import DisplayErrorPage from "./displayError";
// import Validators from "./Validators";

export const resetValidators = (Validators) => {
    Object.keys(Validators).forEach((fieldName) => {
        Validators[fieldName].errors = [];
        Validators[fieldName].state = '';
        Validators[fieldName].valid = true;
    });
}


export const displayValidationErrors = (Validators,fieldName) => {
    const validator = Validators[fieldName];
    if (validator && !validator.valid) {
        const errors = validator.errors.map((info,index) => {

            return <DisplayErrorPage key={index} input={fieldName} info={info} displayError={true}/>;
        });

        return (
            <div>
                {errors }
            </div>
        );
    }
    return <DisplayErrorPage displayError={false} input={fieldName}/>;;
}

export const updateValidators = (Validators,fieldName, value, confirmed_pw,quantity) => {

    var state = value === undefined ? '' : value;

    Validators[fieldName].errors = [];
    Validators[fieldName].state = state;
    Validators[fieldName].valid = true;

    if( Validators[fieldName].state == "" || Validators[fieldName].state == null ||  Validators[fieldName].state == undefined ) {
        if(Validators[fieldName].mandatory[0].value) {
            //console.log(Validators[fieldName].mandatory[0].message);
            Validators[fieldName].errors.push(Validators[fieldName].mandatory[0].message);
            Validators[fieldName].valid = false;
        }else{

            Validators[fieldName].errors = [];
            Validators[fieldName].state = value;
            Validators[fieldName].valid = true;
        }
    } else {
        Validators[fieldName].rules.forEach((rule) => {
            if (rule.test instanceof RegExp) {
                if (!rule.test.test(value)) {
                  // console.log(rule.message)
                    Validators[fieldName].errors.push(rule.message);
                    Validators[fieldName].valid = false;
                    // console.log( Validators[fieldName])

                }
            } else if (typeof rule.test === 'function') {
                if (fieldName=='confirmed_password') {

                    if (!rule.test(value,confirmed_pw)) {
                        Validators[fieldName].errors.push(rule.message);
                        Validators[fieldName].valid = false;
                    }
                }  else if (fieldName == 'inventories_new_quantity' || fieldName == 'quote_quantity' || fieldName=='quantity' ) {
                    // console.log(value + " " + quantity[0].max_quantity + " " +  quantity[0].total)
                        if (!rule.test(value, quantity[0].max_quantity, quantity[0].total)) {
                            Validators[fieldName].errors.push(rule.message);
                            Validators[fieldName].valid = false;
                        }
                    }else{
                    if (!rule.test(value)) {
                        Validators[fieldName].errors.push(rule.message);
                        Validators[fieldName].valid = false;
                    }
                }
            }
        });
    }
}

export const isFormValid = (Validators) => {
    let status = true;

    Object.keys(Validators).forEach((field) => {
        if (!Validators[field].valid) {
            // console.log(Validators[field])
            // console.log(Validators[field].valid)
            status = false;
        }
    });
    return status;
}