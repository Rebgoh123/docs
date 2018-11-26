import React from 'react';
import { connect } from 'react-redux';
import {toast} from "react-toastify";

import CONFIG from "./Index";
import MyEditor from "./_editor";

import { Breadcrumb } from '../Menu/Breadcrumbs'

import templateValidator from "../../Validator/template.validator";
import {isFormValid, resetValidators, updateValidators} from "../../Validator/ValidateHelper";

import draftToHtml from 'draftjs-to-html';

import {templateActions} from "../../../actions/template.actions";

import { HANDLE_REGEX, generateDecorator, findWithRegex,generatePdf} from "./_constant";

import { blockRenderMap,toolboxStyle,toolboxBlock,addOnBlock,customStyleMap } from "./_constant";
import { stateToHTML } from 'draft-js-export-html';

import {convertFromHTML, convertToHTML} from 'draft-convert';

var jsPDF = require('jspdf');

import {
    Modifier,
    SelectionState,
    convertToRaw,
    convertFromRaw,
    EditorState, RichUtils
} from 'draft-js';

import Typography from '@material-ui/core/Typography'
import MaterialUiButton from "../Helper/MaterialUiButton";
import {MaterialUiCircularProgress} from "../Helper/MaterialUiCircularProgress";

class TemplatePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createEmpty(),
            template:[],
            variable:this.props.location.state.detail[0]['variable'],
            question:this.props.location.state.detail[1]['newItems'],
            form:this.props.location.state.detail[4]['form'],
            model:this.props.location.state.detail[5]['model'],

        };

        this.validators = templateValidator;
        this.validateOnSubmit= this.validateOnSubmit.bind(this);

        this.handleChange=this.handleChange.bind(this);

        this.onReplace=this.onReplace.bind(this);
        this.keyExists=this.keyExists.bind(this);

      //  this.clickMe=this.clickMe.bind(this);
    }

    componentWillMount(){
        resetValidators(this.validators);

        const { match: { params } } = this.props;
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
            this.setState({editorState: EditorState.createWithContent(DBEditorState),template}, function() {
                this.onReplace();
            });
        }
    }

    onChange = (editorState) => {

        let heigh =  $(".public-DraftEditor-content").height();

        // onChange(RichUtils.toggleBlockType(editorState, name));
        console.log(heigh + "px ");

        if(heigh % '1028.0488' === 0){
            editorState = RichUtils.toggleBlockType(
                editorState,
                'h1',
            );
        }
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

            if(replacedText===''){

                var blockMap = contentState.getBlockMap();
                var newBlockMap = blockMap.remove(anchorKey)
                contentState = contentState.merge({
                    blockMap: newBlockMap
                })

            }else {
                if(replacedText !== undefined) {
                    contentState = Modifier.replaceText(
                        contentState,
                        selectionState,
                        replacedText,
                    )
                }
            }
            this.setState({
                editorState: EditorState.push(
                    editorState,
                    contentState,
                    'remove-range'
                )})
        });
    }

    // clickMe = (e) => {
    //
    //     const html = convertToHTML({
    //         styleToHTML: (style) => {
    //             if (style === 'BOLD') {
    //                 return <span style={{color: 'blue'}} />;
    //             }
    //         },
    //         blockToHTML: (block) => {
    //             if (block.type === 'rightAlignment') {
    //                 return <right-tool />;
    //             }
    //             if (block.type === 'centerAlignment') {
    //                 return <center-tool />;
    //             }
    //             if (block.type === 'leftAlignment') {
    //                 return <left-tool />;
    //             }
    //             if (block.type === 'justifyAlignment') {
    //                 return <justify-tool />;
    //             }
    //             if (block.type === 'line') {
    //                 return <line-tool />;
    //             }
    //
    //         },
    //         entityToHTML: (entity) => {
    //             if (entity.type === 'IMAGE') {
    //                 let url = entity.data.src
    //                 return {start: "<img src='" + (url) + "'", end: "</img>"}
    //             }
    //         }
    //     })(this.state.editorState.getCurrentContent());
    //
    //     console.log(html)
    //
    //     const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
    //     //
    //     var doc = new jsPDF();
    //
    //     doc.fromHTML($('.public-DraftEditor-content')[0], 15, 15, {
    //         width: 170
    //     }, function() {
    //         doc.save('sample-file.pdf');
    //     });
    //
    //
    //
    //   //  console.log(rawContentState)
    // }

    render() {
        const { templates } = this.props;
        const { template,editorState,breadcrumb,question,variable,form,model } = this.state;

        return (

            <div className="display">
                <div className="content">
                    {templates!==undefined ?
                        <div>
                    <Breadcrumb routes={[{name: "Home", link: "#"},{name:model, link:"/web/" + model},{name:variable.FullName, link:"/web/account/get/" + variable.id}, {
                        name: form.name, link: "#"}, {name: templates.name, link:'#'}]} />

                    <div className="div-menu-header" >

                        <Typography variant="display1"  className="menu-header">
                            Generate {templates.name}
                        </Typography>
                            <MaterialUiButton onSubmit={(e) => this.onReplace(e)} title="Populate variable" style={{marginRight:'20px',backgroundColor:'#000',color:'white'}}/>
                            <MaterialUiButton onSubmit={(e) => generatePdf(e)} type="generate" title="Generate"/>
                        {/*<MaterialUiButton onSubmit={(e) => this.clickMe(e)} type="generate" title="Generate"/>*/}

                    </div>
                    <hr/>

                    {templates === undefined ? <div/>
                        :
                        <MyEditor editorState={editorState} onChange={(e) => this.onChange(e)} addon={[{question},{variable}]}/>
                    }
                    <div id="editor"></div>
                        </div>
                        :
                        <div>
                        <MaterialUiCircularProgress/>
                        </div>
                    }
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
export { connectedHomePage as FormTemplate };