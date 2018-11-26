import React from 'react';
import { connect } from 'react-redux';

import CONFIG from "./Index";

import formValidator from "../../Validator/form.validator";
import {isFormValid, resetValidators, updateValidators} from "../../Validator/ValidateHelper";

import { Breadcrumb } from '../Menu/Breadcrumbs'
import {findArrayElementById} from "../Helper/function";
import MaterialUiButton from "../Helper/MaterialUiButton";

import {formActions} from "../../../actions/form.actions";

import Typography from '@material-ui/core/Typography'

import MyInput from "./_inputType";
import history from '../../../routes/history'
import {MaterialUiCircularProgress} from "../Helper/MaterialUiCircularProgress";

class FormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            variable: this.props.location.state[0].detail,
            formDataID: this.props.location.state[1].formDataID,
            model:this.props.location.state[2].model,
            value: 0,
            form: {},
            formID: {},
            newItems: [],
            templateExist: [],
            formData:[],
        };

        this.validators = formValidator;
        this.validateOnSubmit = this.validateOnSubmit.bind(this);

        this.handleTemplate = this.handleTemplate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentWillMount() {
        const {match: {params}} = this.props;
        const {formDataID} = this.state

        this.props.dispatch(formActions.get_id_template_form(params.formId))

        formDataID === null ? this.props.dispatch(formActions.get_id_form(params.formId))
            :  this.props.dispatch(formActions.get_form_data([{'formDataID': formDataID}, {'formID': params.formId}]))

        this.setState({formID: params.formId})
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.newItem !== this.props.newItem) {
            this.setState({newItems: nextProps.newItem});
        }
        if (nextProps.form !== this.props.form) {
            this.setState({form: nextProps.form});
        }
        if (nextProps.template !== this.props.template) {
            this.setState({templateExist: nextProps.template });
        }
    }


    validateOnSubmit() {
        resetValidators(this.validators);

        const {form} = this.state
        var inputSubmit = CONFIG.input
        var viewDetailsData = this.state.form
        var pdata, input

        for (pdata in viewDetailsData) {
            form[pdata] = viewDetailsData[pdata];
        }

        this.setState({form});

        for (input in inputSubmit) {
            updateValidators(this.validators, inputSubmit[input], this.state.form[inputSubmit[input]]);
        }
    }

    handleChange(id, event) {
        const {newItems, form} = this.state;
        var a = findArrayElementById(newItems, id)
        var type = a === undefined ? 'default' : a.type

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

    handleSubmit(event) {
        event.preventDefault();
        const {newItems, form, variable, formID,model} = this.state;
        var new_form = [{variable}, {newItems}, {formID}, {model} ]
      this.props.dispatch(formActions.create_form_data(new_form))
    }

    handleUpdate(event) {
        event.preventDefault();
        // this.validateOnSubmit();
        const {newItems, form, variable, formID, formDataID} = this.state;
        var new_form = [{variable}, {newItems}, {formID}, {formDataID}]
      this.props.dispatch(formActions.update_form_data(new_form))

    }

    handleTemplate(event) {
        event.preventDefault();
        const {newItems, templateExist, variable, formID, formDataID,form, model} = this.state;

        var new_form = [{variable}, {newItems}, {formID}, {formDataID}, {form:form},{model}]

       formDataID === null ?
          this.props.dispatch(formActions.create_form_data(new_form))
          :
          this.props.dispatch(formActions.update_form_data(new_form))

        var data,cdata

        for (data in newItems) {

            let name = newItems[data]['name'];
            if(newItems[data]['type'] === "Checkbox"){
                var str = '';
                for (cdata in newItems[data]['select']) {

                    if(newItems[data]['select'][cdata]['checked'] === true){
                        str += newItems[data]['select'][cdata]['value'];
                    }

                }
                variable[name] = str
            }else {
                variable[name] = newItems[data]['value']
            }
        }

        this.setState({variable});

      history.push({pathname: '/web/form/template/get/' + templateExist[0]['template_id'] , state: {detail: new_form}})
    }

    render() {
        const { templateExist,form,formDataID,variable,newItems,model} = this.state;

        return (
            <div className="display">
                <div className="content">


                    {form!==undefined ?

                    <div>
                    <Breadcrumb routes={[{name: "Home", link: "#"},{name:model, link:"/web/" + model},{name:variable.FullName, link:"/web/account/get/" + variable.id}, {
                        name: form.name,
                        link: "#"
                    }]} />

                    <div className="div-menu-header">
                        <Typography variant="display1"  className="menu-header">
                       Title: {form.name}
                        </Typography>


                            {formDataID === null ?
                            <MaterialUiButton onSubmit={(e) => this.handleSubmit(e)} type="create" title="Submit"/> :
                                <MaterialUiButton onSubmit={(e) => this.handleUpdate(e)} type="update" title="Update"/>
                            }

                            {templateExist !== undefined &&  templateExist.length  == 0 ?
                           <div/>
                                :
                                <MaterialUiButton onSubmit={(e) => this.handleTemplate(e)}  title="Template" style={{marginLeft: '20px', color:'#fff', backgroundColor:'#000'}}/>
                              }

                    </div>

                    <hr/>

    <div className="editor" >
        <div className="DraftEditor-root">
            <div className="DraftEditor-editorContainer">
                <div className="public-DraftEditor-content">
                    {newItems === undefined ? <div/> :

                    newItems.map((card, i) => (

                        <MyInput key={i}
                                 type={card.type}
                                 id={card.id}
                                 name={card.name}
                                 label={card.name}
                                 select={card.select}
                                 value={card.value || ''}
                                 onChange={(e) => this.handleChange(card.id, e)}
                                 rows={card.rows || ''}
                        /> ))


                    }
            </div>
        </div>
     </div>
</div>

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
        form : state.formReducer.initialize.form,
        newItem : state.formReducer.initialize.formAttributes,
        template: state.formReducer.checked.forms
    }
)

const connectedHomePage = connect(mapStateToProps)(FormPage);
export { connectedHomePage as ModalForm };