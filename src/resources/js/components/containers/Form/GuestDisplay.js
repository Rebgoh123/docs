import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import CONFIG from "./Index";

import formValidator from "../../Validator/form.validator";
import {isFormValid, resetValidators, updateValidators} from "../../Validator/ValidateHelper";

import {findArrayElementById} from "../Helper/function";
import MaterialUiButton from "../Helper/MaterialUiButton";

import {formActions} from "../../../actions/form.actions";

import Typography from '@material-ui/core/Typography'

import MyInput from "./_inputType";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';

const update = require('immutability-helper');

class FormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            variable:[],
            value: 0,
            breadcrumb: [],
            form: {},
            formID: {},
            newItems: [],
            active: false,
            open: false,
            activeId: '',
            templateExist: [],
            formData:[],
        };

        this.validators = formValidator;
        this.validateOnSubmit = this.validateOnSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.handleNormalChange = this.handleNormalChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck=this.handleCheck.bind(this);
    }

    componentWillMount() {
        const {match: {params}} = this.props;

        this.state.variable={'id':parseInt(params.clientId)};
        this.state.formID=params.formId;

      this.props.dispatch(formActions.get_client_form_data([{'formId': params.formId}, {'EntityId': params.clientId}]));

    }

    componentWillReceiveProps(nextProps) {

        console.log(nextProps.form)
        if (nextProps.form !== this.props.form) {
            this.setState({newItems: nextProps.form['formAttributes'],form:nextProps.form['form'],formData:nextProps.form['data'],formDataID:nextProps.form['formDataId']});
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

    handleInputChanges(id, i, event) {
        const {newItems} = this.state;
        var a = findArrayElementById(newItems, id)

        switch (a['type']) {
            case 'MultiLine':
            case 'Date' :
            case 'Text' :
                a[event.target.name] = event.target.value;
                break;
            case 'Paragraph' :
            case 'Header' :
                a['value'] = event.target.value;
                break;
            case 'Radio':
            case 'Checkbox':
            case 'Select':
                switch (event.target.name) {
                    case 'label':
                    case 'value':
                        a['select'][i][event.target.name] = event.target.value;
                        break;
                    default:
                        a[event.target.name] = event.target.value
                        break;
                }

                if (i == 0 && event.target.name != 'label' && event.target.name != 'name') {
                    a['value'] = event.target.value
                }
                break;
            default:
                return (<div/>)
                break;
        }

        this.setState({newItems});
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

    handleNormalChange(event) {
        const {form} = this.state;
        form[event.target.name] = event.target.value;
        this.setState({form});
        updateValidators(this.validators, event.target.name, event.target.value);
    }

    handleSubmit(event) {

    }

    handleCheck() {
        return this.state.newItems.find((element) => {
            return element.type === 'PDF';
        })


    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        //event.preventDefault();
        this.setState({ open: false });

        this.validateOnSubmit();
        const {newItems, form, variable, formID, formDataID} = this.state;
        var new_form = [{variable}, {newItems}, {formID},{formDataID}]

        if(this.state.formData === true){
            this.props.dispatch(formActions.update_form_data(new_form))
        }else{
            this.props.dispatch(formActions.create_form_data(new_form))
        }

        window.close();
    };

    render() {
        const { templateExist,breadcrumb,form,formData,activeId,newItems} = this.state;

        return (

            <div className="display">
                <div className="content">

                    {form.length > 0 ?
                        <div>
                            <div className="div-menu-header">
                                <Typography variant="display1" className="menu-header">{form[0].name}
                                </Typography>


                                <div>

                                        {/*<Button onClick={this.handleClickOpen}>Submit</Button>*/}



                                    {templateExist !== undefined && templateExist.length == 0 ?
                                        <div/>
                                        :
                                        <MaterialUiButton onSubmit={(e) => this.handleTemplate(e)} type="update"
                                                          title="Template"/>
                                    }
                                </div>
                            </div>

                            <hr/>
                            {newItems === undefined ? <div/> :

                                this.handleCheck() ?
                                    <div className="editor">
                                        {newItems.map((card, i) => (
                                            card.type==="PDF"?
                                        <MyInput key={i}
                                                 type={card.type}
                                                 id={card.id}
                                                 name={card.name}
                                                 label={card.name}
                                                 select={card.select}
                                                 value={card.value || ''}
                                                 onChange={(e) => this.handleChange(card.id, e)}
                                                 rows={card.rows || ''}
                                        />

                                            :
                                                <div className="PDF-DraftEditor-content" key={i}>
                                                    <MyInput key={i}
                                                             type={card.type}
                                                             id={card.id}
                                                             name={card.name}
                                                             label={card.name}
                                                             select={card.select}
                                                             value={card.value || ''}
                                                             onChange={(e) => this.handleChange(card.id, e)}
                                                             rows={card.rows || ''}
                                                    />
                                                </div>

                                        ))}

                                        <FormControl className="formControl"
                                                     fullWidth>
                                            <Button  style={{margin:'0 auto', backgroundColor:'#A4031F', color:'white'}} size="large"  onClick={this.handleClickOpen}>Submit</Button>


                                        </FormControl>
                                    </div>
                                    :

                            <div className="editor">
                                <div className="DraftEditor-root">
                                    <div className="DraftEditor-editorContainer">
                                        <div className="public-DraftEditor-content">
                                            { newItems.map((card, i) => (
                                            <MyInput key={i}
                                                     type={card.type}
                                                     id={card.id}
                                                     name={card.name}
                                                     label={card.name}
                                                     select={card.select}
                                                     value={card.value || ''}
                                                     onChange={(e) => this.handleChange(card.id, e)}
                                                     rows={card.rows || ''}
                                            />
                                            ))}

                                        </div>
                                    </div>
                                </div>
                            </div>

                                }
                        </div>
                        :
                        <div/>
                    }


                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">Form Submitted</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                               Thank you for submitting the form.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="inherit">
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
        form : state.formReducer.additional.forms,
       // newItem : state.formReducer.additional.formAttributes,
      //  template: state.formReducer.checked.forms
    }
)

const connectedHomePage = connect(mapStateToProps)(FormPage);
export { connectedHomePage as GuestModalForm };