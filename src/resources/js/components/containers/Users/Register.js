import React from 'react';
import { connect } from 'react-redux'

// import { userActions } from "../../../actions/user.actions";

import { MaterialUiTextfield } from "../Helper/MaterialUiTextfield";

// import userValidator from "../../Validator/user.validator";
// import {resetValidators,updateValidators,isFormValid} from "../../Validator/ValidateHelper";

import Button from '@material-ui/core/Button';

class RegisterPage extends React.Component {

    constructor(props) {
        super(props);

        this.props.dispatch(userActions.registering());

        this.state = {
            user: {},
            input :['name','email','password','confirmed_password'],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        // this.validators = userValidator;
        // this.validateOnSubmit= this.validateOnSubmit.bind(this);
    }


    // validateOnSubmit() {
    //
    //         resetValidators(this.validators);
    //
    //         const {user} = this.state;
    //
    //         var inputSubmit = this.state.input;
    //
    //         var pdata,input
    //         var viewDetailsData = this.state.user
    //
    //         for (pdata in viewDetailsData) {
    //
    //             user[pdata] = viewDetailsData[pdata];
    //         }
    //
    //         this.setState({user});
    //
    //         var confirmedpw =this.state.user['confirmed_password'] === undefined ? ' ' :  this.state.user['confirmed_password']
    //
    //         for (input in inputSubmit) {
    //             updateValidators(this.validators,inputSubmit[input], this.state.user[inputSubmit[input]],confirmedpw);
    //         }
    // }

    handleChange(event) {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });

        var confirmedpw =this.state.user['confirmed_password'] === undefined ? ' ' :  this.state.user['confirmed_password']

       // updateValidators(this.validators,event.target.name, event.target.value,confirmedpw);
    }

    handleSubmit(event) {
        event.preventDefault();
        // this.validateOnSubmit('submit')
        //
        // if(isFormValid(this.validators)) {
        //     const {dispatch} = this.props;
        //     dispatch(userActions.register(this.state.user));
        // }
    }

    render() {
        const { user } = this.state;

        return (
            <div className="div-login-style">
                <h1> Register</h1>
                <form onSubmit={this.handleSubmit}>

                    <MaterialUiTextfield
                        id="name"
                        name="name"
                        label="Name"
                        value={user.name || ''}
                        onChange={this.handleChange}
                        validator={this.validators}
                    />

                    <MaterialUiTextfield
                        id="email"
                        name="email"
                        label="Email"
                        value={user.email || ''}
                        onChange={this.handleChange}
                        validator={this.validators}
                    />

                    <MaterialUiTextfield
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={user.password || ''}
                        onChange={this.handleChange}
                        validator={this.validators}
                    />

                    <MaterialUiTextfield
                        id="confirmed_password"
                        name="confirmed_password"
                        label="Confirmed Password"
                        type="password"
                        value={user.confirmed_password || ''}
                        onChange={this.handleChange}
                        validator={this.validators}
                    />

                    <br/><br/>
                    <div className="form-group">
                        <Button variant="raised" color="inherit" type="submit" fullWidth>
                            SUBMIT
                        </Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    registering : state.registration
})


const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage }