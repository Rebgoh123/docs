import React from 'react';
import { connect } from 'react-redux';

import CONFIG from "./Index";
import history from "../../../routes/history";

import {templateActions} from "../../../actions/template.actions";
import {accountActions} from "../../../actions/account.actions";
import {formActions} from "../../../actions/form.actions";

import {Breadcrumb} from '../Menu/Breadcrumbs'
import {MaterialUiCircularProgress} from '../Helper/MaterialUiCircularProgress'
import {MaterialUiTextfield} from "../Helper/MaterialUiTextfield";
import {MaterialUiTabs} from "../Helper/MaterialUiTabs";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/playcirclefilled';
import LinkIcon from '@material-ui/icons/link';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import {CompletedAvatar,IncompletedAvatar} from "../Helper/function";
import {MaterialUiSelect} from "../Helper/MaterialUiSelect";
import Avatar from "@material-ui/core/Avatar/Avatar";

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateFilter:[],
            templateItems: [],
            formFilter:[],
            formItems: [],
            account:[],
            copied: false,
        };

        this.handleCopyChange=this.handleCopyChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchHandler=this.searchHandler.bind(this);
        this.handleNormalChange=this.handleNormalChange.bind(this);
        this.findArrayElementByDirectorId=this.findArrayElementByDirectorId.bind(this);
        this.handleSubmitButton=this.handleSubmitButton.bind(this);

    }

    componentWillMount(){

        const { match: { params } } = this.props;
        var modalForm = [{'modal_id':2}, {'entity_id': params.accountId}]
        this.props.dispatch(formActions.get_id_modal_form(modalForm));
        this.props.dispatch(accountActions.get_id_account(params.accountId));
        this.props.dispatch(templateActions.get_id_modal_template(2));

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.form !== this.props.form) {
            this.setState({formFilter: nextProps.form, formItems:nextProps.form});
        }

        if (nextProps.template !== this.props.template) {
            this.setState({templateFilter: nextProps.template, templateItems:nextProps.template});
        }

        if (nextProps.account !== this.props.account) {
            this.setState({account: nextProps.account});
        }
    }

    handleChange(event) {
        const { account } = this.state;
        account[event.target.name] = event.target.value;
        this.setState({ account });

    }

    handleCopyChange(i,event) {
        const{formItems} = this.state;

        formItems[i]['copied'] = true;

        this.setState({formItems})

        setTimeout(function() {
            formItems[i]['copied'] = false;
            this.setState({formItems})
        }.bind(this), 1500);

    }

    handleSubmit(event) {
        event.preventDefault();

        const {account} = this.state;

        this.props.dispatch(accountActions.update(account))
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

 findArrayElementByDirectorId = (array, id) => {
        return array.find((element) => {
            return element.DirectorEntityID === id;
        })
    }

    handleNormalChange(t,index,event) {
        const{account} = this.state;
        const{form,template} = this.props

        if(t === 'f') {

            form[index][event.target.name] = event.target.value;
            form[index]['account'] = account
            form[index]['account']['directorInfo'] = this.findArrayElementByDirectorId(account['directors'], event.target.value)
            form[index]['account']['directorName'] = account['directorInfo']['director_name']

            this.setState({form })

        }else if(t==='t'){
            template[index][event.target.name] = event.target.value;
            template[index]['account'] = account
            template[index]['account']['directorInfo'] = this.findArrayElementByDirectorId(account['directors'], event.target.value)
            template[index]['account']['directorName'] = account['directorInfo']['director_name']

            this.setState({template })
        }

    }

    handleSubmitButton(e,f,i) {
        const{account} = this.state;
        const{form,template} = this.props

        let details;

        if(f === 'f') {
            form[i]['account'] = account
            details=form[i];

            history.push({pathname: '/web/form/modal/get/' + details.id,  state: [{ detail: details },{formDataID: details.form_data_id},{model: 'Account'}, {director: this.state.account['directorInfo'] }]})

        }else if(f==='t'){
            template[i]['account']=account;
            details=template[i];

            history.push({pathname: '/web/template/modal/get/' + details.id,  state: [{ detail: details},{model: 'Account'},]})
        }
    }


    render() {
        const {  account, template, form } = this.props;
        const { templateItems, formItems} = this.state;

        return (
            <div className="display">
            <div className="content">

                {account!==undefined ?

                    <div>
            <Breadcrumb routes={[ {name:"Home", link:"#"} , {name:"Account", link:"/web/account"},  {name:account.FullName, link:"/web/account/get/" + account.id}]} />

                <div className="div-menu-header">
                    <div className="menu-header">  {CONFIG.page} </div>
                </div>

        <hr/>

        <div className="div-form-no-modal">
            <MaterialUiTabs tab={CONFIG.tab}>

            <div className="tab-container">
                <form>

                <div className="form-client">

            <MaterialUiTextfield
            id="FullName"
            name="FullName"
            label="Full Name"
            value={account.FullName}
            onChange={this.handleChange}
            readOnly={true}

            />
                </div>
                </form>
            </div>

            <div className="tab-container">


                {form !== undefined && account !== undefined ?

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


                            <div style={{width:'250px', marginRight:'2%'}}>
                                    <MaterialUiSelect
                                        label="director"
                                        name='director'
                                        id='director'
                                        select={account.directors}
                                        value={value.director || ''}
                                        onChange={(e)=>this.handleNormalChange('f',index,e)}
                                    />
                            </div>
                                    <ListItemSecondaryAction>
                                        {value.online === '0' ?
                                            <CopyToClipboard text={value.url}
                                                             onCopy={() => this.handleCopyChange(index)}>
                                                <LinkIcon/>
                                            </CopyToClipboard> :
                                            <div/>
                                        }
                                        {value.copied ? <span style={{color: 'red', fontSize:'12px'}}>Copied.</span> : null}


                                        <IconButton onClick={(e) =>this.handleSubmitButton(e,'f',index)}>
                                            <CommentIcon />
                                        </IconButton>

                                    </ListItemSecondaryAction>
                                </ListItem>

                            ))}
                        </List>

                    </div>
                    :<div/>
                }
            </div>

                <div className="tab-container">

                    {template !== undefined && account !==undefined ?

                        <div className="form-generate">

                            <input type="text" className="template-search" onChange={(e) => this.searchHandler('template',e)}/>
                            <List>
                                {templateItems.map((value, index) => (

                                    <ListItem
                                        className='templateList'
                                        key={index}
                                    >

                                        <Avatar style={{background:'#000'}}> {value.name}   </Avatar>


                                        <ListItemText primary={value.name} secondary={value.description}  />


                                        <div style={{width:'250px', marginRight:'2%'}}>
                                            <MaterialUiSelect
                                                label="director"
                                                name='director'
                                                id='director'
                                                select={account.directors}
                                                value={value.director || ''}
                                                onChange={(e)=>this.handleNormalChange('t',index,e)}
                                            />

                                        </div>
                                        <ListItemSecondaryAction>

                                            <IconButton onClick={(e) =>this.handleSubmitButton(e,'t',index)}>
                                                <CommentIcon />
                                            </IconButton>

                                        </ListItemSecondaryAction>
                                    </ListItem>

                                ))}
                            </List>

                        </div>:<div/>
                    }
                </div>

            </MaterialUiTabs>




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
        account : state.accountReducer.initialize.account,
        template : state.templateReducer.initialize.templates,
        form : state.formReducer.initialize.forms,
    }
)

const connectedHomePage = connect(mapStateToProps)(Edit);
export { connectedHomePage as AccountEditPage };