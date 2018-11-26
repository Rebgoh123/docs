import React from 'react';
import { connect } from 'react-redux';

import CONFIG from "./Index";
import history from "../../../routes/history";

import {templateActions} from "../../../actions/template.actions";
import {clientActions} from "../../../actions/client.actions";
import {formActions} from "../../../actions/form.actions";

import {Breadcrumb} from '../Menu/Breadcrumbs'
import {MaterialUiCircularProgress} from '../Helper/MaterialUiCircularProgress'
import MaterialUiButton from '../Helper/MaterialUiButton'
import {MaterialUiTextfield} from "../Helper/MaterialUiTextfield";
import {MaterialUiSelect} from "../Helper/MaterialUiSelect";
import {MaterialUiTabs} from "../Helper/MaterialUiTabs";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/playcirclefilled';



import Avatar from '@material-ui/core/Avatar';
import CompletedIcon from '@material-ui/icons/checkbox';
import IncompletedIcon from '@material-ui/icons/checkboxoutlineblank';

export const CompletedAvatar = () => {
    return (
        <Avatar style={{background:'#548687'}}>  <CompletedIcon />  </Avatar>

    );
};

export const IncompletedAvatar = () => {
    return (
        <Avatar style={{background:'#D36582'}}> <IncompletedIcon  />    </Avatar>

    );
};


class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateFilter:[],
            templateItems: [],
            formFilter:[],
            formItems: [],
            client:[],
            tab:[ 'Information','Forms Available' ,'Generate Template' ],
            breadcrumb:[],
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchHandler=this.searchHandler.bind(this);

    }

    componentWillMount(){

        const { match: { params } } = this.props;
        this.state.breadcrumb = [ {name:"Home", link:"#"} , {name:"Client", link:"/web/client"},  {name:params.clientId, link:"/client/get/" + params.clientId}];
        this.props.dispatch(clientActions.get_id_client(params.clientId));
        this.props.dispatch(templateActions.get_id_modal_template(1));

        var modalForm = [{'modal_id':1}, {'entity_id': params.clientId}]
        this.props.dispatch(formActions.get_id_modal_form(modalForm));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.template !== this.props.template) {
            this.setState({templateFilter: nextProps.template, templateItems:nextProps.template});
        }

        if (nextProps.form !== this.props.form) {
            this.setState({formFilter: nextProps.form, formItems:nextProps.form});
        }
    }

    handleChange(event) {
        const { client } = this.props;
        client[event.target.name] = event.target.value;
        this.setState({ client });

    }

    handleSubmit(event) {
        event.preventDefault();

        const {client} = this.state;
        this.props.dispatch(clientActions.update(client))
    }

    searchHandler (type,event) {

if(type === 'template') {
    var updatedList = this.state.templateFilter;

    let searcjQery = event.target.value.toLowerCase(),
        templateItems = updatedList.filter((el) => {
            let searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searcjQery) !== -1;
        })
    this.setState({
        templateItems: templateItems
    })
} else {
    var updatedList = this.state.formFilter;

    let searcjQery = event.target.value.toLowerCase(),
        formItems = updatedList.filter((el) => {
            let searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searcjQery) !== -1;
        })
    this.setState({
        formItems: formItems
    })
}

    }


    render() {
        const {  client, template, form } = this.props;
        const { breadcrumb, tab, templateFilter, templateItems, formFilter, formItems} = this.state;

        return (
            <div className="display">
            <div className="content">
            <Breadcrumb routes={breadcrumb} />

                <div className="div-menu-header">
                    <div className="menu-header">  {CONFIG.page} </div>
                </div>

        <hr/>

        <div className="div-form-no-modal">
        {client===undefined ?
            <div>
                <MaterialUiCircularProgress/>
            </div>
    :
            <MaterialUiTabs tab={CONFIG.tab}>

            <div className="tab-container">
                <form>
                <div className="div-menu-header">

                        <MaterialUiButton onSubmit={this.handleSubmit} type="update" title="Update"/>

                </div>
                <div className="form-client">

            <MaterialUiTextfield
            id="FullName"
            name="FullName"
            label="Full Name"
            value={client.FullName}
            onChange={this.handleChange}
            readOnly={true}

            />
            <MaterialUiTextfield
            id="Address1"
            name="Address1"
            label="Address1"
            value={client.Address1 || ''}
            onChange={this.handleChange}
            required={false}
            />
            <MaterialUiTextfield
            id="Address2"
            name="Address2"
            label="Address2"
            value={client.Address2 || ''}
            onChange={this.handleChange}
            required={false}
            />
            <MaterialUiTextfield
                id="Address3"
                name="Address3"
                label="Address3"
                value={client.Address3 || ''}
                onChange={this.handleChange}
                required={false}
            />
            <MaterialUiTextfield
                id="PostalCode"
                name="PostalCode"
                label="Postal Code"
                value={client.PostalCode || ''}
                onChange={this.handleChange}
                required={false}
            />
            {client.AddressTypeID===0?
              <MaterialUiSelect
                  label="Address Type"
                  name='AddressTypeID'
                  id='AddressTypeID'
                  value={client.AddressTypeID}
                  onChange={this.handleChange}
              />
            :
            <MaterialUiSelect
                label="Address Type"
                name='AddressTypeID'
                id='AddressTypeID'
                value={client.AddressTypeID}
                onChange={this.handleChange}

            />
        }
                    <MaterialUiSelect
                        label="Status"
                        name='Status'
                        id='Status'
                        value={client.Status}
                        onChange={this.handleChange}
                    />
                </div>
                </form>
            </div>

            <div className="tab-container">


                {form === undefined ? <div/> :

                    <div className="form-generate">

                        <input type="text" className="template-search" onChange={(e) => this.searchHandler('form',e)}/>
                        <List>
                            {formItems.map((value, index) => (

                                <ListItem
                                    className='templateList'
                                    key={index}
                                >

                                        {value.FormStatus === 'Completed' ? <CompletedAvatar/>: <IncompletedAvatar/>   }


                                    <ListItemText primary={value.name} secondary={value.description}  />
                                    <ListItemSecondaryAction>

                                        <IconButton onClick={() => { history.push({pathname: '/form/modal/get/' + value.id,  state: [{ detail: this.props.client },{formDataID: value.form_data_id}]})}}>
                                            <CommentIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>

                            ))}
                        </List>

                    </div>
                }
            </div>

            <div className="tab-container">
                    {template === undefined ? <div/> :

                            <div className="template-generate">

                                    <input type="text" className="template-search" onChange={(e) => this.searchHandler('template',e)}/>
                                    <List>
                                {templateItems.map((value, index) => (
                                    <ListItem
                                    className='templateList'
                                    key={index}
                                    >

                                    <ListItemText primary={value.name} secondary={value.description}  />
                                    <ListItemSecondaryAction>
                                    <IconButton onClick={() => { history.push({pathname: '/template/modal/get/' + value.id,  state: { detail: this.props.client }})}}>
                                    <CommentIcon />
                                    </IconButton>
                                    </ListItemSecondaryAction>
                                    </ListItem>

                                ))}
                                    </List>

                            </div>
                    }
            </div>

            </MaterialUiTabs>
    }

        </div>
        </div>
            </div>
    );
    }
}

const mapStateToProps = state => ({
        client : state.clientReducer.initialize.client,
        template : state.templateReducer.initialize.templates,
        form : state.formReducer.initialize.forms,
    }
)

const connectedHomePage = connect(mapStateToProps)(Edit);
export { connectedHomePage as ClientEditPage };