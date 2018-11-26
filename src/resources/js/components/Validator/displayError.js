import React from 'react';
import { connect } from 'react-redux';

import {helperActions} from "../../actions/helper.actions";

import FormHelperText from '@material-ui/core/FormHelperText';

export class DisplayError extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            errors:this.props.error_fields === undefined ? [] : this.props.error_fields
        };
    }

    render() {

        return (
            this.props.displayError === true ?
                <FormHelperText error key={this.props.key}  id="name-error-text">{this.props.info}</FormHelperText> :
                ''

        );
    }
}

const mapStateToProps = state => ({
    }
)

const DisplayErrorPage = connect(mapStateToProps)(DisplayError);

export default (DisplayErrorPage);