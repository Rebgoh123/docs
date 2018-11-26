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

import {templateActions} from "../../../actions/template.actions";

import {
    convertToRaw,
    convertFromRaw,
    EditorState,
} from 'draft-js';

import Typography from '@material-ui/core/Typography'
import {modalActions} from "../../../actions/modal.actions";
import {MaterialUiSelect} from "../Helper/MaterialUiSelect";

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

        const { match: { params } } = this.props;
        this.state.breadcrumb = [ {name:"Home", link:"#"} , {name:"Template", link:"/web/template"},  {name:params.templateId, link:"/web/template/get/" + params.templateId}];

        this.props.dispatch(templateActions.get_id_template(params.templateId));

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.templates !== this.props.templates) {

            const {template} = this.state
            const DBEditorState = convertFromRaw(JSON.parse(nextProps.templates[0]['content']));
            template['id'] = nextProps.templates[0]['id'];
            template['title'] = nextProps.templates[0]['name'];
            template['name'] = nextProps.templates[0]['name'];
            template['description'] = nextProps.templates[0]['description'];
            template['modal'] = nextProps.templates[0]['modal'];
            this.setState({editorState: EditorState.createWithContent(DBEditorState),template});
        }
    }

    onChange = (editorState) => {
        this.setState({editorState,});
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
            this.props.dispatch(templateActions.update(new_template));
            //console.log( JSON.stringify(convertToRaw(editorState.getCurrentContent())))
        } else {

            toast("📢 Please fill up all mandatory fields! 😑😠 ")
        }

    }

    render() {
        const { templates } = this.props;
        const { template,editorState,breadcrumb } = this.state;

        return (

            <div className="display">
                <div className="content">
                    <Breadcrumb routes={breadcrumb} />

                    <div className="div-menu-header" >

                        <Typography variant="display1"  className="menu-header">
                            Add New {CONFIG.page}
                        </Typography>
                        <div>

                            <MaterialUiDialog type="update" title="Update Template" submit={(e) => this.handleSubmit(e)} content="To save the template, please enter the template title and description.">
                                <MaterialUiTextfield
                                    id="name"
                                    name="name"
                                    label="title"
                                    value={template.name}
                                    onChange={this.handleChange}
                                    validator={this.validators}
                                />
                                <MaterialUiTextfield
                                    id="description"
                                    name="description"
                                    label="description"
                                    value={template.description}
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

                    {templates === undefined ? <div/>
                        :
                        <MyEditor editorState={editorState} onChange={(e) => this.onChange(e)}/>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        modals : state.modalReducer.initialize.modals,
        templates : state.templateReducer.initialize.template,
    }
)

const connectedHomePage = connect(mapStateToProps)(TemplatePage);
export { connectedHomePage as EditTemplate };