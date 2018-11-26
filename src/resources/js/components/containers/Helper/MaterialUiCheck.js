import React from 'react';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {helperActions} from "../../../actions/helper.actions";

export class MaterialUiCheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: [],
        };

    }

    componentWillMount(){
        var name = this.props.type
        var assignedType

        switch(name) {
            case 'Checkbox':
                assignedType= this.props.check
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
                    <FormGroup  style={{paddingTop:'25px'}} row={this.props.row === undefined ? false : this.props.row }>

                        {type.map((value, index) => (
                            <FormControlLabel
                                key={index}
                                control={
                                    <Checkbox checked={value.checked} onChange={this.props.onChange} value={value.key.toString()} />
                                }
                                label={value.label}
                            />

                        ))}

                    </FormGroup>
                    {/*<FormHelperText>Be careful</FormHelperText>*/}
                </FormControl>

                <div/>

            </div>
        );
    }
}