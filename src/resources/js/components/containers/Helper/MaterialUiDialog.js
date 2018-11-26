import React from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import LinkIcon from '@material-ui/icons/link';
import CommentIcon from '@material-ui/icons/playcirclefilled';

import MaterialUiButton from "./MaterialUiButton";
import HeaderIcon from "@material-ui/core/SvgIcon/SvgIcon";
import IconButton from "@material-ui/core/IconButton/IconButton";
import history from "../../../routes/history";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction/ListItemSecondaryAction";
import {CopyToClipboard} from 'react-copy-to-clipboard';

class MaterialUiDialogPage extends React.Component {

    constructor(props) {


        super(props);
        this.state = {
            open: false,
            copied: false,
        };

        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleAddSubmit=this.handleAddSubmit.bind(this);
        this.splitText=this.splitText.bind(this);
    }

    handleClickOpen = () => {
        this.setState({ open: true});
    };

    handleClose = () => {
        this.setState({ open: false});
    };

    handleSubmit = (e) => {
        const {submit} = this.props;

        this.setState({ open: false});

     submit(e)


    };


    handleAddSubmit = (e) => {
        const {handleSubmitAdditional} = this.props;

        this.setState({ open: false});

       handleSubmitAdditional(e);


    };

    splitText= (text) => {
        let newText = text.split('\n').map((item, i) => {
            return <p key={i}>{item}</p>;
        });
    }

    handleButton(name){
        switch(name){

            case "create":
                return <MaterialUiButton onSubmit={this.handleClickOpen} type="create" title="Create"/>
            case "update":
                return   <MaterialUiButton onSubmit={this.handleClickOpen} type="update" title="Update"/>
            case "url":
                return <div>
                <IconButton onClick={this.handleClickOpen} >
                            <LinkIcon />
                    </IconButton>


                    <IconButton >
                         <CommentIcon />
                     </IconButton>
                </div>
            default:
                return "";
        }
    }


    render() {

        return (
            <div>

                  {this.handleButton(this.props.type)}


                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >

                    <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                    <DialogContentText>

                        {this.props.content.split("<br>").map((item, key) => {
                            return <span key={key}>{item}<br/> </span>
                        })}

                    </DialogContentText>
                      {this.props.children}
                    </DialogContent>
                    <DialogActions>

                        <MaterialUiButton onSubmit={this.handleSubmit} type="save" title="Save" />

                        {this.props.additional !== undefined ?  <MaterialUiButton onSubmit={this.handleAddSubmit} type="variable" title="Template"/> : <div/>}

                        <MaterialUiButton onSubmit={this.handleClose} type="close" title="Close"  />

                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

MaterialUiDialogPage.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
    }
)

const MaterialUiDialog = connect(mapStateToProps) (withMobileDialog()(MaterialUiDialogPage));

export default(MaterialUiDialog);