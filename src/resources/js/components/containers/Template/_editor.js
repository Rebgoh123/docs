import React from 'react';
import { connect } from 'react-redux';
import { ToolboxBtn,ToolboxSel } from "./_button";
import { blockRenderMap,toolboxStyle,toolboxBlock,addOnBlock,customStyleMap } from "./_constant";

var Immutable = require('immutable');
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import {
    setEditorState,
    EditorState,
    RichUtils,
    AtomicBlockUtils
} from 'draft-js';

import { Modifier } from 'draft-js';

import Editor, { composeDecorators } from 'draft-js-plugins-editor';

import createImagePlugin from 'draft-js-image-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createFocusPlugin from 'draft-js-focus-plugin';
import createResizeablePlugin from 'draft-js-resizeable-plugin';
import createBlockDndPlugin from 'draft-js-drag-n-drop-plugin';
import createDndFileUploadPlugin from  '@mikeljames/draft-js-drag-n-drop-upload-plugin';
import createCounterPlugin from 'draft-js-counter-plugin';

import mockUpload from './_mockUpload';
import Chip from "@material-ui/core/Chip/Chip";

const resizeablePlugin = createResizeablePlugin();
const blockDndPlugin = createBlockDndPlugin();
const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();
const counterPlugin = createCounterPlugin();

const { AlignmentTool } = alignmentPlugin;

const decorator = composeDecorators(
    alignmentPlugin.decorator,
    focusPlugin.decorator,
    resizeablePlugin.decorator,
    blockDndPlugin.decorator
);

const imagePlugin = createImagePlugin({ decorator });

const dndFileUploadPlugin = createDndFileUploadPlugin({
    handleUpload: mockUpload,
    addImage: imagePlugin.addImage,
});

const plugins = [
    counterPlugin,
    dndFileUploadPlugin,
    blockDndPlugin,
    focusPlugin,
    alignmentPlugin,
    resizeablePlugin,
    imagePlugin
];

class EditorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            template:[],
        };

        this._insertText=this._insertText.bind(this);
        this._onToolboxClick=this._onToolboxClick.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.handleEditorChange=this.handleEditorChange.bind(this);

    }

    componentWillMount(){
        const { template } = this.state;

        template['fontSize'] = '8'
        template['color'] = 'black'
        template['header'] = 'header-one'

        this.setState({template,});
    }

    focus = () => {
        this.editor.focus();
    };

    handleKeyCommand(command, editorState) {
        const { onChange} = this.props;

        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    _insertText(text) {
        const {editorState, onChange} = this.props;

        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();

        var divText
        switch(text){
            case "simAddress":
                divText = "Simbiosis Analytics Pte. Ltd. \n" +
                    "8 Eu Tong Sen Street #18-81 The Central Singapore 059818\n" +
                    "Company Registration No. : 201500258C\n"
                break;
            default:
                divText= '{{' +text + '}}'
                break;
        }

        const ncs = Modifier.insertText(contentState, selection, divText);
        onChange(EditorState.push(editorState, ncs, 'insert-fragment'));
    }

    _onToolboxClick(name,type) {

        const {editorState, onChange} = this.props;

        type ==='style' ?

           onChange(RichUtils.toggleInlineStyle(editorState, name))
            :
            name !=='image' ?
           onChange(RichUtils.toggleBlockType(editorState, name))
            :
           onChange(RichUtils.toggleBlockType(editorState, name))
    }


    handleChangeImage(e) {
        const {editorState,onChange} = this.props;

        var image = document.getElementById('flat-button-file-editor').files;

        if (image.length > 0) {
            this.getBase64(image[0])
                .then(result =>
                    {
                        const newEditorState = this.insertImage(editorState,result);
                        onChange(newEditorState);
                        $('input[type="file"]').val('');
                    }
                )
                .catch( err => console.log(err));
        }
    }

    getBase64=(file)=> {
        return new Promise((resolve, reject) => {

            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                resolve(reader.result);
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
                reject(error);
            };

        });

    }

    insertImage = (editorState, base64) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'image',
            'IMMUTABLE',
            { src: base64 },
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(
            editorState,
            { currentContent: contentStateWithEntity },
        );
        return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' ');
    }

    handleEditorChange(type,event) {
        const {template} = this.state;
        const {editorState, onChange} = this.props;
        template[event.target.name] = event.target.value ;


        this.setState({template})

        switch(type){
            case 'header':
              onChange(RichUtils.toggleBlockType(editorState, event.target.value));
                break;
            default:

                onChange(RichUtils.toggleInlineStyle(editorState, event.target.value))
                break;
        }

    }

    render() {
        const { editorState, onChange,addon } = this.props;

        return (

            <div>
                    <div className="toolboxBtn-wrapper">
                        {toolboxStyle.map((btn, index) => (
                            <ToolboxBtn handleClick={(e) => this._onToolboxClick(btn.name,btn.type,e)} key={index} name={btn.name} tooltip={btn.tooltip}/>
                        ))}
                        <ToolboxSel
                            onChange={(e) => this.handleEditorChange('color',e)}
                            value={this.state.template['color']}
                            editorState={editorState}
                            name='color'/>
                        <ToolboxSel
                            onChange={(e) => this.handleEditorChange('font',e)}
                            value={this.state.template['fontSize']}
                            editorState={editorState}
                            name='fontSize'/>
                        <ToolboxSel
                            onChange={(e) => this.handleEditorChange('header',e)}
                            value={this.state.template['header']}
                            editorState={editorState}
                            name='header'/>

                        {toolboxBlock.map((btn, index) => (
                            <ToolboxBtn handleClick={(e) => this._onToolboxClick(btn.name,btn.type,e)} onChange={(e)=>this.handleChangeImage(e)} key={index} name={btn.name} tooltip={btn.tooltip} inputType={btn.inputType}/>
                        ))}

                        <div className="toolboxBtn-AddOn">
                            {addOnBlock.map((btn, index) => (
                                <ToolboxBtn handleClick={(e) => this._insertText(btn.name,e)} key={index} name={btn.name} tooltip={btn.tooltip}/>
                            ))}

                        </div>
                    </div>

                {addon !== undefined ?

                    <div className="helper-box">
                        Value available in form : {addon[1].variable.name} <br/>

                        {addon[0].question.map((btn, index) => (
                            <Chip
                                style={{marginRight:'5px', marginBottom:'5px'}}
                                key={index}
                                label={btn.name}
                                onClick={(e) => this._insertText(btn.name,e)}
                            />
                        ))
                        }
                    </div>
                    :

                    <div/>

                }

                <div id="content">
                    <div className="editor" onClick={this.focus} >
                        <Editor
                            blockRenderMap={blockRenderMap}
                            customStyleMap={customStyleMap}
                            editorState={editorState}
                            onChange={onChange}
                            handleKeyCommand={this.handleKeyCommand}
                            plugins={plugins}
                            ref={(element) => { this.editor = element; }}
                            id="lppresults"
                        />


                        </div>
                        <AlignmentTool />
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => ({
    }
)

const MyEditor = connect(mapStateToProps)(EditorComponent);
export default(MyEditor);