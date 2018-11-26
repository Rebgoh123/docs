import React from 'react';
import {connect} from "react-redux";

import Button from '@material-ui/core/Button';

import UpdateIcon from '@material-ui/icons/cached';
import AddIcon from '@material-ui/icons/Add';
import GenerateIcon from '@material-ui/icons/Build';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/notinterested';
import VariableIcon from '@material-ui/icons/wbsunny';


class MaterialUiButtonPage extends React.Component {

    typeOfInput(type) {

        switch (type) {
            case 'update':
                return (
                    <Button onClick={this.props.onSubmit} size="large" variant="contained" className="update-button">
                        <UpdateIcon/> {this.props.title}
                    </Button>
                );
                break;
            case 'add':


                return (
                    <Button  type="submit" variant="fab">
                        <AddIcon/> {this.props.title}
                    </Button>
                );
                break;
            case 'generate':
                return (
                    <Button  type="submit"  size="large" onClick={this.props.onSubmit} variant="contained" className="generate-button" style={this.props.style}>
                        <GenerateIcon/> {this.props.title}
                    </Button>
                );
                break;
            case 'create':
                return (
                    <Button onClick={this.props.onSubmit} size="large" variant="contained" className="add-button">
                        <AddIcon/> {this.props.title}
                    </Button>
                );
                break;
            case 'variable':
                return (
                    <Button onClick={this.props.onSubmit} size="medium" variant="contained" style={{background:'#545C52', color:'white', marginRight:'10px'}}>
                   <VariableIcon/>  {this.props.title}
                    </Button>
                );
                break;
            case 'save':
                return (
                    <Button onClick={this.props.onSubmit} size="medium" variant="contained" style={{background:'#B49802',color:'white',  marginRight:'10px'}}  >
                        <SaveIcon/> {this.props.title}
                    </Button>
                );
                break;
            case 'close':
                return (
                    <Button onClick={this.props.onSubmit} size="medium" variant="contained" style={{background:'#2E294E', color:'white',marginRight:'10px',}} >
                        <CancelIcon/> {this.props.title}
                    </Button>
                );
                break;
            default:
                return (
                    <Button  type="submit"  size="large" onClick={this.props.onSubmit} variant="contained"  style={this.props.style}>
                    {this.props.title}
                    </Button>
                );
                break;
        }
    }

    render() {

        return (
            <div>
                {this.typeOfInput(this.props.type)}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    }
)

const MaterialUiButton = connect(mapStateToProps)(MaterialUiButtonPage);

export default(MaterialUiButton);