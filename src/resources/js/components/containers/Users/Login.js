import React from 'react';
import { connect } from 'react-redux'
import history from '../../../routes/history'

import APPCONFIG from  "../../../constants/config";

import { MaterialUiTextfield } from "../Helper/MaterialUiTextfield";

import Button from '@material-ui/core/Button';
import {userActions} from "../../../actions/user.actions";

class LoginPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {},
            input :['username','password'],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentWillMount(){
       // this.props.dispatch(userActions.login());
    }

    handleChange(event) {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });

    }

    handleSubmit(event) {
        event.preventDefault();

        // localStorage.setItem('user', true);
        history.push('/');
    }

    render() {
        const { user } = this.state;

        return (

            <div className="div-login-style">
                <h1> {APPCONFIG.brand}</h1>
            <hr/>
                <form onSubmit={this.handleSubmit}>

                    <MaterialUiTextfield
                        id="username"
                        name="username"
                        label="Username"
                        value={user.username || ''}
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
    // user : state.userReducer.authentication.initialState,

})

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }