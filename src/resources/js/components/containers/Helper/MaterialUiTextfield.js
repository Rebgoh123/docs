import React from 'react';

import {displayValidationErrors} from "../../Validator/ValidateHelper";

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


export class MaterialUiTextfield extends React.Component {
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <div>

                <FormControl className="formControl" required={this.props.required===undefined ? true : false} fullWidth >
                    <InputLabel className="inputLabel" shrink={true} htmlFor={this.props.id}>{this.Capitalize(this.props.label)}</InputLabel>

                        <Input className="inputInput"
                               id={this.props.id}
                               name={this.props.name}
                               value={this.props.value}
                               onChange={this.props.onChange === undefined ? '' : this.props.onChange}
                               type={this.props.type === undefined ? 'text' : this.props.type}
                               startAdornment={this.props.startAdornment === undefined ? '' : this.props.startAdornment}
                               readOnly={this.props.readOnly===undefined ? false : this.props.readOnly}
                               multiline={this.props.multiline===undefined ? false : this.props.multiline}
                               rows={this.props.rows===undefined ? '' : this.props.rows}
                               //defaultValue={this.props.defaultValue === undefined ? '' : this.props.defaultValue}
                        />

                    {this.props.validator===undefined ? '' :  displayValidationErrors(this.props.validator,this.props.name)}
                    {/*{this.props.validator===undefined ? '' : this.props.value ==='' ? '' : displayValidationErrors(this.props.validator,this.props.name)}*/}

                </FormControl>
            </div>
        );
    }
}