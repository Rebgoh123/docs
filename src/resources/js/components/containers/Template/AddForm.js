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

import {formActions} from "../../../actions/form.actions";
import {modalActions} from "../../../actions/modal.actions";

import { HANDLE_REGEX, generateDecorator, findWithRegex, SearchHighlight,generatePdf} from "./_constant";

import {
    convertToRaw,
    EditorState,
} from 'draft-js';

import Typography from '@material-ui/core/Typography'
import IconButton from "@material-ui/core/IconButton/IconButton";
import MaterialUiButton from "../Helper/MaterialUiButton";


class TemplatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            template:[],
            variable:this.props.location.state.detail[0],
            question:this.props.location.state.detail[1],

        };

        this.validators = templateValidator;
        this.validateOnSubmit= this.validateOnSubmit.bind(this);

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentWillMount(){

        resetValidators(this.validators);

        this.state.template['modal'] = 1;
        this.props.dispatch(modalActions.get_all_active())

    }

    onChange = (editorState) => {

       // let height =  $(".public-DraftEditor-content").height();
        //     console.log(heigh + " current ");
        this.setState({
            editorState: EditorState.set(editorState, { decorator: generateDecorator() }),
        });
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
        console.log(this.validators)
        console.log(new_template)
        if(isFormValid(this.validators)) {

            const {template, editorState,variable,question} = this.state;
            var new_template = [variable,question,template, convertToRaw(editorState.getCurrentContent())];
          this.props.dispatch(formActions.create_form_template(new_template))
            // this.props.dispatch(templateActions.create(new_template));
           // console.log( JSON.stringify(convertToRaw(editorState.getCurrentContent())))

            console.log(new_template)
        } else {

            toast("📢 Please fill up all mandatory fields! 😑😠 ")
        }

    }

    render() {
        const {  } = this.props;
        const { template,editorState,breadcrumb,question,variable } = this.state;


        return (

            <div className="display">
                <div className="content">
                    {/*<Breadcrumb routes={breadcrumb} />*/}

                    <div className="div-menu-header" >

                        <Typography variant="display1"  className="menu-header">
                            Add New {CONFIG.page} to Form
                        </Typography>
                        <div>
                            <MaterialUiDialog type="create" title="Create New Form" submit={(e) => this.handleSubmit(e)}
                                              content="To save the form and template, please enter the form title and description.">

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
                                    name='modal'
                                    id='modal'
                                    select={this.props.modals}
                                    value={template.modal}
                                    onChange={this.handleChange}
                                />
                            </MaterialUiDialog>

                        </div>
                    </div>
                    <hr/>

                        <MyEditor editorState={editorState} onChange={(e) => this.onChange(e)} addon={[{question},{variable}]}/>

                    <div id="editor"></div>

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
export { connectedHomePage as AddFormTemplate };