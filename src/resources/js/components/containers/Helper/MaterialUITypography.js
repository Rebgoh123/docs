import React from 'react';

import {displayValidationErrors} from "../../Validator/ValidateHelper";

import Typography from '@material-ui/core/Typography';


export class MaterialUiTypography extends React.Component {
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {
        return (
            <div>

                {this.props.type === "Header" ?

                <Typography variant="headline" gutterBottom>
                    {this.props.value}
                </Typography>
            :
                <Typography variant="body1" gutterBottom>

                    {this.props.value.split("\n").map(function(item,key) {
                        return (
                        <span key={key}>
                            {item}
                        <br/>
                        </span>
                        )
                    })}
                </Typography>

                }
            </div>
        );
    }
}