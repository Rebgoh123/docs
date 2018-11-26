import React from 'react';
import { connect } from 'react-redux';
import {toast} from "react-toastify";

import CONFIG from "./Index";
import MyEditor from "./_editor";

import { Breadcrumb } from '../Menu/Breadcrumbs'

import templateValidator from "../../Validator/template.validator";
import {isFormValid, resetValidators, updateValidators} from "../../Validator/ValidateHelper";

import {templateActions} from "../../../actions/template.actions";

import { HANDLE_REGEX, generateDecorator, findWithRegex, SearchHighlight,generatePdf} from "./_constant";

import {
    Modifier,
    SelectionState,
    CompositeDecorator,
    convertToRaw,
    convertFromRaw,
    EditorState, RichUtils,
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
            variable:this.props.location.state.detail,
        };

        this.validators = templateValidator;
        this.validateOnSubmit= this.validateOnSubmit.bind(this);

        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

        this.onReplace=this.onReplace.bind(this);
        this.keyExists=this.keyExists.bind(this);
    }

    componentWillMount(){

        console.log(this.props)
        resetValidators(this.validators);

        const { match: { params } } = this.props;
        this.state.breadcrumb = [ {name:"Home", link:"#"} , {name:"Template", link:"/web/template"},  {name:params.templateId, link:"/web/template/get/" + params.templateId}];
        this.props.dispatch(templateActions.get_id_template(params.templateId));

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.templates !== this.props.templates) {

            const {template} = this.state
            const DBEditorState = convertFromRaw(JSON.parse(nextProps.templates['content']));
            template['id'] = nextProps.templates['id'];
            template['title'] = nextProps.templates['name'];
            template['name'] = nextProps.templates['name'];
            template['description'] = nextProps.templates['description'];
          this.setState({editorState: EditorState.createWithContent(DBEditorState),template}, function() {
              this.onReplace();
          });
        }
    }

    onChange = (editorState) => {

      let heigh =  $(".public-DraftEditor-content").height();

      // onChange(RichUtils.toggleBlockType(editorState, name));
      console.log(heigh + " current ");
        this.setState({
            editorState: EditorState.set(editorState, { decorator: generateDecorator() }),
        });

       // this.setState({editorState,});
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

    keyExists(key, search) {
        if (!search || (search.constructor !== Array && search.constructor !== Object)) {
            return false;
        }
        for (var i = 0; i < search.length; i++) {
            if (search[i] === key) {
                return true;
            }
        }
        return search[key];
    }


    onReplace = (e) => {
        const regex = new RegExp(HANDLE_REGEX);
        const { editorState } = this.state;
        const selectionsToReplace = [];
        const blockMap = editorState.getCurrentContent().getBlockMap();

        blockMap.forEach((contentBlock) => (
            findWithRegex(regex, contentBlock, (start, end) => {
                const text = contentBlock.getText();
                const blockKey = contentBlock.getKey();
                const blockSelection = SelectionState
                    .createEmpty(blockKey)
                    .merge({
                        anchorOffset: start,
                        focusOffset: end,
                    });

                selectionsToReplace.push(blockSelection)
            })
        ));

        let contentState = editorState.getCurrentContent();

        selectionsToReplace.forEach(selectionState => {

            var anchorKey = selectionState.getAnchorKey();
            var currentContent = editorState.getCurrentContent();
            var currentContentBlock = currentContent.getBlockForKey(anchorKey);
            var start = selectionState.getStartOffset();
            var end = selectionState.getEndOffset();
            var selectedText = currentContentBlock.getText().slice(start, end);

            var obj = [this.state.variable]

            var replacedText =  this.keyExists(selectedText.slice(2,[-2]), obj[0]);

            if(replacedText !== undefined) {
                contentState = Modifier.replaceText(
                    contentState,
                    selectionState,
                    replacedText,
                )
            }
        });

        this.setState({
            editorState: EditorState.push(
                editorState,
                contentState,
            )
        })
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
                           Generate Template
                        </Typography>
                        <div>
                            <MaterialUiButton onSubmit={(e) => generatePdf(e)} type="generate" title="Generate"/>

                        </div>
                    </div>
                    <hr/>



                        {templates === undefined ? <div/>
                        :
                        <MyEditor editorState={editorState} onChange={(e) => this.onChange(e)}/>
                        }

                    <div id="editor"></div>


                    {/*<div id="print">*/}

                {/*</div>*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        templates : state.templateReducer.initialize.template,
    }
)

const connectedHomePage = connect(mapStateToProps)(TemplatePage);
export { connectedHomePage as ModalTemplate };