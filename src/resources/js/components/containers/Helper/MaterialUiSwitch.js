import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

export class MaterialUiSwitch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentWillMount(){
    }


    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {

        return (

            <div>

                <FormControl className="formControl" fullWidth >
                    <InputLabel className="inputLabel" shrink={true}  htmlFor={this.props.label}>{this.Capitalize(this.props.label)}</InputLabel>

                    <FormControlLabel
                        className="inputInput"
                        control={
                            <Switch
                                id={this.props.id}
                                name={this.props.name}
                                onChange={this.props.onChange}
                                value={this.props.value}
                            />
                        }
                    />
                </FormControl>

            </div>
        );
    }
}