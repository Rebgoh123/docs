import React from 'react';


import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {helperActions} from "../../../actions/helper.actions";

export class MaterialUiRadio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: [],
        };

    }

    componentWillMount(){

        console.log(this.props.radio)
        var name = this.props.type
        var assignedType

        const {type} = this.state;

        switch(name) {
            case 'Radio':
                assignedType= this.props.radio;
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

                    <InputLabel className="inputLabel" shrink={true}
                                htmlFor={this.props.label}>{this.Capitalize(this.props.label)}</InputLabel>
                    <RadioGroup
                        aria-label="Gender"
                        name={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        style={{paddingTop:'5%'}}
                        row={this.props.row === undefined ? false : this.props.row}
                            >
                        {type.map((value, index) => (

                            <FormControlLabel key={index} value={value.value} control={<Radio />} label={value.label} />


                        ))}
                        required
                    </RadioGroup>
                    {/*<FormHelperText>Be careful</FormHelperText>*/}
                </FormControl>

                <div/>

            </div>
        );
    }
}