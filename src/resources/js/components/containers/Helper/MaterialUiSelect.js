import React from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {helperActions} from "../../../actions/helper.actions";

export class MaterialUiSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: [],
        };

    }

    componentWillMount(){
        var name = this.props.name
        var assignedType

        switch(name) {
            case 'AddressTypeID':
                assignedType= [{'value':0, 'label' : 'Not Available'},{'value':"1", 'label' : 'Mailing Address'}, {'value':"2", 'label' : 'Registered Address'}];
                break;
            case 'status':
            case 'Status':
                assignedType= [{'value':"1", 'label' : 'Active'}, {'value':"0", 'label' : 'Inactive'}];
                break;
            case 'type':
            case 'modal':
            case 'Countries':
            //     assignedType=
            //     break;
            case 'Select':
            case 'select':
                assignedType=  this.props.select
                break;
            default:
                ''
        }

        this.setState({ type:assignedType });

    }


    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {

        const {type} = this.state;

        return (

            <div>

                    <FormControl className="formControl" required={this.props.required === undefined ? true : false}
                                 fullWidth>
                        {this.props.labelOutput === undefined ? <InputLabel className="inputLabel" shrink={true}
                                                                      htmlFor={this.props.label}>{this.Capitalize(this.props.label)}</InputLabel> :
                        ''}

                        <Select
                            name={this.props.name}
                            id={this.props.id}
                            className="inputInput"
                            value={this.props.value}
                            onChange={this.props.onChange}
                            input={<Input name={this.props.label}
                            readOnly={this.props.readOnly===undefined ? false : this.props.readOnly}/>}
                        >
                            {type.map((value, index) => (
                                <MenuItem key={index} value={value.value}>{value.label}</MenuItem>
                                ))}

                        </Select>
                    </FormControl>

                    <div/>

            </div>
        );
    }
}