import React from 'react';
import { connect } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import { toast } from 'react-toastify';

import CONFIG from "./Index";
import List from "./_button";
import SideMenu from "./_sideMenu";
import Target from "./_target";
import Card from "./_card";
import { items,helper } from "./_constant";

import formValidator from "../../Validator/form.validator";
import {isFormValid, resetValidators, updateValidators} from "../../Validator/ValidateHelper";

import { Breadcrumb } from '../Menu/Breadcrumbs'
import {MaterialUiTextfield} from "../Helper/MaterialUiTextfield";
import {findArrayElementById} from "../Helper/function";
import MaterialUiDialog from '../Helper/MaterialUiDialog';
import {countries} from '../Helper/CountryConstant';
import {MaterialUiSelect} from "../Helper/MaterialUiSelect";

import {formActions} from "../../../actions/form.actions";
import {modalActions} from "../../../actions/modal.actions";

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/pindrop';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/settings';
import SmileIcon from '@material-ui/icons/tagfaces';
import EditIcon from '@material-ui/icons/edit';
import AddIcon from '@material-ui/icons/addcircle';
import RemoveIcon from '@material-ui/icons/removecircle';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';

import history from '../../../routes/history'

const update = require('immutability-helper');

class Add extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            breadcrumb:[],
            form: {},
            newItems: [],
            active:false,
            activeId:'',
        };

        this.validators = formValidator;
        this.validateOnSubmit= this.validateOnSubmit.bind(this);

        this.handleChangeCheckedRow=this.handleChangeCheckedRow.bind(this)
        this.handleChangeImage=this.handleChangeImage.bind(this);
        this.handleAddOption=this.handleAddOption.bind(this);
        this.handleEditInput=this.handleEditInput.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.handleInputChanges=this.handleInputChanges.bind(this);
        this.handleNormalChange=this.handleNormalChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleTemplate=this.handleTemplate.bind(this);
    }

    componentWillMount(){
        resetValidators(this.validators);
        this.state.form['modal'] = 1;
        this.state.form['type'] = '1';
        this.state.form['online'] =false;
        this.state.form['day'] =0;
        this.state.breadcrumb = [ {name:"Home", link:"/"} , {name:"Form", link:"/web/form"},{name:"Add New Form", link:"/web/form/add-form"} ];
        this.props.dispatch(modalActions.get_all_active())
        this.props.dispatch(formActions.get_form_type())
    }

    validateOnSubmit() {
        resetValidators(this.validators);

        const {form} = this.state
        var inputSubmit = CONFIG.input
        var viewDetailsData = this.state.form
        var pdata,input

        for (pdata in viewDetailsData) {
            form[pdata] = viewDetailsData[pdata];
        }

        this.setState({form});

        for (input in inputSubmit) {
            updateValidators(this.validators,inputSubmit[input], this.state.form[inputSubmit[input]]);
        }
    }

    handleChangeImage(lengthItem,a,name) {

        const {newItems } = this.state
        var image = document.getElementById('flat-button-file-editor-' + name).files;

        if (image.length > 0) {

             this.getBase64(image[0])
                 .then(result =>
                 {
                     var b = {id:lengthItem, name: a['name'], value:result, key:a['id'], type:a['type'],imageUrl:true} ;
                     newItems.push(b);
                     this.setState({newItems})
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

    addItem = (id,type) => {

        console.log(id,type)

        const { newItems } = this.state
        var lengthItem = newItems.length.toString();

     if(type==='item'){
         var a = findArrayElementById(items,id)
     }else if(type ==='helper'){
         var a = findArrayElementById(helper,id)
     }

     if(a.name === 'Image' || a.name === 'PDF'){
         this.handleChangeImage(lengthItem,a,a.name);
     }else{
         switch(a.name) {

             case 'Services':
                 var c = [{key:0,value: "Corporate Secretarial", checked : false, label: 'Corporate Secretarial'},{key:1,value:"Tax", checked : false, label:"Tax"},{key:2,value:"Accounting", checked : false, label:"Accounting"}]
                 var b = {id:lengthItem, name: a['name'], value:'', key:a['id'], type:a['type'],select:c} ;
                 break;

             case 'Acknowledge':
                 var c = [{key:1, value: 'Agree', label: "Agree"}]
                 var b = {id:lengthItem, name:"I understand and I agree to the terms and conditions.", value:"", key:a['id'] , type:a['type'], select:c} ;
                 break;

             case 'Gender':
                 var c = [{key:1, value: 'Female', label: "Female"},{key:2, value: "Male", label: "Male"}]
                 var b = {id:lengthItem, name: a['name'], value:"Female", key:a['id'] , type:a['type'], select:c} ;
                 break;
             case 'Countries':
                 var b = {id:lengthItem, name: a['name'], value:"Singapore", key:a['id'] , type:a['type'], select: countries} ;
                 break;
             case 'Mobile':
             case 'Name':
                 var b = {id:lengthItem, name: a['name'], value:'', key:a['id'], type:a['type']} ;
                 break;
             case 'Text':
             case 'Date':
                 var b = {id:lengthItem, name: a['name'], value:'', key:a['id'], type:a['type']} ;
                 break;
             case 'MultiLine':
                 var b = {id:lengthItem,  name: a['name'], rows: 3, value:'', key:a['id'], type:a['type'] } ;
                 break;

             case 'Header':
                 var b = {id:lengthItem,  name: a['name'], value:"Header Example", key:a['id'], type:a['type'] } ;
                 break;

             case 'Paragraph':
                 var b = {id:lengthItem,  name: a['name'], value:"Climate warming, whatever one concludes about its effect on the warming as  effect on the warm a global problem rather obal problem r than oneobaproblem r obal problem r created primarily by rich nations: Most scientists are wobal problem r obal problem r obal problem roefully una \n Climate warming, whatever one concludes about its effect on the warming as  effect on the warm a global problem rather obal problem r than oneobaproblem r obal problem r created primarily by rich nations: Most scientists are wobal problem r obal problem r obal problem roefully una \n Climate warming, whatever one concludes about its effect on the warming as  effect on the warm a global problem rather obal problem r than oneobaproblem r obal problem r created primarily by rich nations: Most scientists are wobal problem r obal problem r obal problem roefully una", key:a['id'], type:a['type'] } ;
                 break;

             case 'Radio':
             case 'Select':
                 var c = [{key:1, value: a.name + "1", label: a.name + "1"},{key:2, value: a.name + "2", label: a.name + "2"}, {key:3, value:  a.name + "3", label:  a.name + "3"}]
                 var b = {id:lengthItem, name: a['name'], value:"Select1", key:a['id'] , type:a['type'], select:c, row:false} ;
                 break;

             case 'Checkbox':
                 var c = [{key:0,value: a.name + "1", checked : false, label: a.name + "1"},{key:1,value:a.name + "2", checked : false, label:a.name + "2"},{key:2,value:a.name + "3", checked : false, label:a.name + "3"}]
                 var b = {id:lengthItem, name: a['name'], value:"Check1", key:a['id'] ,  type:a['type'], select:c, row:false} ;
                 break;
         }
         newItems.push(b);
         this.setState({newItems})
     }
    }


    moveCard = (dragIndex, hoverIndex) => {
        const { newItems } = this.state
        const dragCard = newItems[dragIndex]

        this.setState(
            update(this.state, {
                newItems: {
                    $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
                },
            }),
        )
    }

    handleRemoveInput(index,e){
        const { newItems } = this.state;
        newItems.splice(index, 1);
        this.setState({newItems, active:false});
    }

    handleChangeInput = id => {
        this.setState({ active:true, activeId:id ,value:2});
    }

    handleChangeCheckedRow (index,type,event) {
        const {newItems } = this.state;
        var a = findArrayElementById(newItems,index)

        a['row'] = event.target.checked

        this.setState({ newItems });
    };

    handleEditInput(id) {
        const {newItems } = this.state;
        var a = findArrayElementById(newItems,id)

        var input=  a == undefined ? '' : a['type'];

        switch(input) {
            case 'Date' :
            case 'Text' :
            return (
                <MaterialUiTextfield
                    id="title"
                    name="name"
                    label="name"
                    value={a['name'] || ''}
                    onChange={(e) => this.handleInputChanges(id,'',e)}
                />
            )
            break;
            case 'Header' :
                return (
                    <MaterialUiTextfield
                        id="header"
                        name="name"
                        label="Header Content"
                        value={a['value'] || ''}
                        onChange={(e) => this.handleInputChanges(id,'',e)}
                    />
                )
                break;
            case 'Paragraph' :
                return (
                    <MaterialUiTextfield
                        id="paragraph"
                        name="name"
                        label="Paragraph Content"
                        value={a['value'] || ''}
                        onChange={(e) => this.handleInputChanges(id,'',e)}
                        multiline={true}
                    />
                )
                break;
            case 'MultiLine' :
            return (
                <div>
                    <MaterialUiTextfield
                        id="title"
                        name="name"
                        label="name"
                        value={a['name'] || ''}
                        onChange={(e) => this.handleInputChanges(id,'',e)}
                    />
                    <MaterialUiTextfield
                        id="MultiLineRow"
                        name="rows"
                        label="MultiLine Row"
                        value={a['rows'] || ''}
                        onChange={(e) => this.handleInputChanges(id,'',e)}
                        multiline={true}
                    />
                </div>
            )
            break;
            case 'Checkbox' :
            case 'Select' :
            case 'Radio' :
                return (
                    <div>
                        <Button onClick={(e) => this.handleAddOption(id,input,e)} variant="extendedFab" style={{border:'none',backgroundColor:'transparent', color: '#2AB7CA',fontSize:'12px'}}>
                            <AddIcon/> New {input} Option
                        </Button>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={a['row']}
                                    onChange={(e) => this.handleChangeCheckedRow(id,input,e)}
                                />
                            }
                            label="Row"
                        />

                        <MaterialUiTextfield
                            id="title"
                            name="name"
                            label="name"
                            value={a['name'] || ''}
                            onChange={(e) => this.handleInputChanges(id,'',e)}
                        />
                        <hr/>
                        {a['select'].map((object, i) => (
                    <div key={i}>
                        <Button onClick={(e) => this.handleRemoveOption(id,i,input,e)} variant="extendedFab" style={{marginTop:'5px',border:'grey',backgroundColor:'transparent', color:'#FF5964', fontSize:'12px'}}>
                            <RemoveIcon/> { "Remove " + input +" Button " + i }
                        </Button>

                            <MaterialUiTextfield
                                id="title"
                                name="label"
                                label={ input+" Button Label " + i }
                                value={object['label'] || ''}
                                onChange={(e) => this.handleInputChanges(id,i,e)}
                            />

                            <MaterialUiTextfield
                            id="title"
                            name="value"
                            label={input+ " Button Label " + i + " Value " }
                            value={object['value'] || ''}
                            onChange={(e) => this.handleInputChanges(id,i,e)}
                            multiline={true}
                            />

                        </div>
                        ))}
                    </div>
                )
                break;

            default:
                return(<div/>)
            break;
        }
    }

    handleRemoveOption(index,i,type){
        console.log("removing")
        const {newItems } = this.state;
        var a = findArrayElementById(newItems,index)
        var remove= a['select'].splice(i,1);

        if(a['select'].length > 0){
          a['value'] = a['select'][0]['value'];
            }

        this.setState({ newItems });
    }

    handleAddOption(index,type){

        const {newItems } = this.state;
        var a = findArrayElementById(newItems,index)

        var length = a['select'].length + 1
        a['select'].push({key: length, value: type + " " + length, label: type + " " + length })

        if(length ==1) {
            a['value']  = 'default' + length
        }

        this.setState({ newItems });

    }

    handleInputChanges(id,i,event){
        const {newItems } = this.state;
        var a = findArrayElementById(newItems,id)

        switch(a['type']) {
            case 'MultiLine':
            case 'Date' :
            case 'Text' :
                a[event.target.name]  = event.target.value;
                break;
            case 'Paragraph' :
            case 'Header' :
                a['value'] = event.target.value;
                break;
            case 'Radio':
            case 'Checkbox':
            case 'Select':
                switch(event.target.name){
                    case 'label':
                    case 'value':
                        a['select'][i][event.target.name] = event.target.value;
                        break;
                    default:
                        a[event.target.name]  = event.target.value
                        break;
                }

                if(i ==0 && event.target.name != 'label'&& event.target.name!= 'name') {
                    a['value']  = event.target.value
                }
                break;
            default:
                return(<div/>)
                break;
        }

        this.setState({ newItems });
    }

    handleTabChange = (event, value) => {
        this.setState({ value });
    };

    handleChange(id,event) {
        const {newItems, form} = this.state;
        var a = findArrayElementById(newItems, id)
        var type = a === undefined ? 'default' : a.name

        switch (type) {
            case 'Checkbox':
                var index = a['select'].findIndex((element) => element.key == event.target.value)
                a['select'][index]['checked'] = event.target.checked;
                this.setState({newItems});
                break;
            default:
                a['value'] = event.target.value;
                this.setState({newItems});
                break;
        }
    }

    handleNormalChange(event) {
        const { form } = this.state;

        if(event.target.name!=='online'){
            form[event.target.name] = event.target.value;
        }else{
            form[event.target.name]= event.target.checked
        }

        this.setState({ form });
        updateValidators(this.validators,event.target.name, event.target.value);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.validateOnSubmit();

        if(isFormValid(this.validators)) {

            const {form, newItems} = this.state;
            var new_form = [form, newItems]
            this.props.dispatch(formActions.create(new_form))

      //console.log(new_form)
        } else {

            toast("📢 Please fill up all mandatory fields! 😑😠 ")
        }

    }

    handleTemplate(event) {
        event.preventDefault();
        this.validateOnSubmit();

        if(isFormValid(this.validators)) {

            const {form, newItems} = this.state;
            var new_form = [form, newItems]

            history.push({
                pathname: '/web/form/add-on-template',
                state: { detail: new_form }
            })
        } else {

            toast("📢 Please fill up all mandatory fields! 😑😠 ")
        }

    }

    render() {
        const { breadcrumb,form,newItems,active,activeId,value,tab,handleNormalChange,validators} = this.state;
        const { modals,types } = this.props;

        return (
            <div className="display">
                <div className="content">
                    <Breadcrumb routes={breadcrumb} />

                    <div className="div-menu-header">
                        <Typography variant="display1"  className="menu-header">
                            Add New {CONFIG.page}
                        </Typography>
                        <div>

                            <MaterialUiDialog additional="Create Template" handleSubmitAdditional={(e) => this.handleTemplate(e)} type="create" title="Create New Form" submit={(e) => this.handleSubmit(e)}
                                              content="
                                               • Click SAVE to create a new form <br>
                                               • Click TEMPLATE to attached a template to the form <br>
                                               • Click CLOSE to carry on editing the form"/>

                        </div>
                    </div>
                    <hr/>
                    <Grid container spacing={24}>
                        <Grid item xs={8}>
                            <Typography variant="headline"  className="menu-header">
                                Preview
                            </Typography>

                                <Target newItems={this.state.newItems}>

                                    {this.state.newItems.length === 0 ?
                                        <div className="emptyPreview">
                                            <Typography variant="title"  className="menu-header" style={{color:'#DB5461'}}>
                                                Instruction
                                            </Typography>
                                           1) Fill up the Title and Description of the form in the Current tab from the right. <br/>
                                           2) Click on the toolbox tab on the right hand side to start building your
                                            form! <SmileIcon/> <br/>
                                           3) Click on the Create button at the Top right corner to save ur form!
                                        </div>
                                        :
                                        <div>
                                        {newItems.map((card, i) => (
                                            <Card
                                                id={card.id}
                                                input={card}
                                                key={card.id}
                                                index={i}
                                                type={card.type}
                                                moveCard={this.moveCard}
                                                handleChange={(e) => this.handleChange(card.id, e)}
                                                editCard={(e) => this.handleChangeInput(card.id, e)}
                                                removeCard={(e) => this.handleRemoveInput(i, e)}
                                            />
                                        ))}
                                        </div>
                                    }
                                </Target>
                        </Grid>

                        <Grid item xs>

                            {modals !== undefined && types!==undefined ?
                            <SideMenu value={this.state.value}
                                      handleTabChange={this.handleTabChange}
                                      handleNormalChange={(e)=>this.handleNormalChange(e)}
                                      validators={this.state.validators}
                                      form ={this.state.form}
                                      types={this.props.types}
                                      modals={this.props.modals}
                                      active = {this.props.active}
                                      handleEditInput={(e)=>this.handleEditInput(e)}
                                      newItems={this.state.newItems}
                                      activeId={this.state.activeId}
                                      active={this.state.active}

                            >
                                <h3>Types</h3>
                                <Grid container spacing={24} >
                                    {items.map((item, index) => (
                                        <List key={item.id+'item'} icon={item.name + "Icon"} className="toolbox-button" item={item} handleDrop={(id) => this.addItem(id,'item')}  handleClick={(e) => this.addItem(item.id,'item',e)} />
                                    ))}
                                </Grid>
                                <br/>
                                <h3>Helper</h3>
                                <Grid container spacing={24} >

                                    {helper.map((item, index) => (
                                        <List key={item.id+'helper'} icon={item.name + "Icon"} className="toolbox-helper-button"  item={item} handleDrop={(id) => this.addItem(id,'helper')}  handleClick={(e) => this.addItem(item.id,'helper',e)} />
                                    ))}
                                </Grid>
                            </SideMenu>
                            :
                                <div/>
                            }
                        </Grid>
                    </Grid>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        modals : state.modalReducer.initialize.modals,
        types : state.formReducer.additional.forms,
    }
)

const connectedAddPage = connect(mapStateToProps)(Add);

export default DragDropContext(HTML5Backend)(connectedAddPage);
// export default DragDropContext(HTML5Backend)(Add);