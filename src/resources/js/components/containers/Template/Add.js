import React from 'react';
import { connect } from 'react-redux';
import {toast} from "react-toastify";

import CONFIG from "./Index";
import MyEditor from "./_editor";

import { Breadcrumb } from '../Menu/Breadcrumbs'

import templateValidator from "../../Validator/template.validator";
import {isFormValid, resetValidators, updateValidators} from "../../Validator/ValidateHelper";

import MaterialUiDialog from '../Helper/MaterialUiDialog';
import {MaterialUiTextfield} from "../Helper/MaterialUiTextfield";
import {MaterialUiSelect} from "../Helper/MaterialUiSelect";

import {templateActions} from "../../../actions/template.actions";

import {
    convertToRaw,
    EditorState,
} from 'draft-js';

import Typography from '@material-ui/core/Typography'
import {modalActions} from "../../../actions/modal.actions";

class TemplatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            template:[],
        };

        this.validators = templateValidator;
        this.validateOnSubmit= this.validateOnSubmit.bind(this);

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentWillMount(){

        resetValidators(this.validators);
        this.state.template['select'] = 1;
        this.state.breadcrumb = [ {name:"Home", link:"#"} , {name:"Template", link:"/web/template"},{name:"New Template", link:"/web/add-template"} ];
        this.props.dispatch(modalActions.get_all_active())
    }

    onChange = (editorState) => {

        // console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 2))

        // if (editorState.getLastChangeType() == "insert-fragment") {
        //     editorState = removeInlineStyles(editorState, ["BOLD"]); // This retains only BOLD styling
        // }
        this.setState({
            editorState
        });

     //  this.setState({editorState,});
    };

    validateOnSubmit() {
        resetValidators(this.validators);

        const {template} = this.state
        var inputSubmit = CONFIG.input
        var viewDetailsData = this.state.template
        var pdata,input

        for (pdata in viewDetailsData) {
            template[pdata] = viewDetailsData[pdata];
        }

        this.setState({template});

        for (input in inputSubmit) {
            updateValidators(this.validators,inputSubmit[input], this.state.template[inputSubmit[input]]);
        }
    }

    handleChange(event) {
        const { template } = this.state;
        template[event.target.name] = event.target.value;
        this.setState({ template });
        updateValidators(this.validators,event.target.name, event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.validateOnSubmit();
        if(isFormValid(this.validators)) {

            const {template, editorState} = this.state;
            var new_template = [template, convertToRaw(editorState.getCurrentContent())];
            console.log("sending...");

        this.props.dispatch(templateActions.create(new_template));
        // console.log( JSON.stringify(convertToRaw(editorState.getCurrentContent())))
            console.log(new_template)
        } else {

            toast("📢 Please fill up all mandatory fields! 😑😠 ")
        }

    }

    render() {
        const { editorState,template,breadcrumb } = this.state;
        const { modals } = this.props

        return (

            <div className="display">
                <div className="content">
                        <Breadcrumb routes={breadcrumb} />

                    <div className="div-menu-header" >

                        <Typography variant="display1"  className="menu-header">
                            Add New {CONFIG.page}
                        </Typography>
                        <div>

                                <MaterialUiDialog type="create" title="Create New Form" submit={(e) => this.handleSubmit(e)} content="To save the template, please enter the form title and description.">

                                    <MaterialUiTextfield
                                        id="name"
                                        name="name"
                                        label="title"
                                        value={template.name|| ''}
                                        onChange={this.handleChange}
                                        validator={this.validators}
                                    />
                                    <MaterialUiTextfield
                                        id="description"
                                        name="description"
                                        label="description"
                                        value={template.description|| ''}
                                        onChange={this.handleChange}
                                        multiline={true}
                                        validator={this.validators}
                                    />

                                    <MaterialUiSelect
                                        label="Modal"
                                        name='select'
                                        id='modal'
                                        select={this.props.modals}
                                        value={template.select}
                                        onChange={this.handleChange}
                                    />
                            </MaterialUiDialog>
                        </div>
                    </div>
                    <hr/>
                  <MyEditor editorState={editorState}  onChange={(e) => this.onChange(e)}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        modals : state.modalReducer.initialize.modals,
    }
)

const connectedHomePage = connect(mapStateToProps)(TemplatePage);
export { connectedHomePage as AddTemplate };