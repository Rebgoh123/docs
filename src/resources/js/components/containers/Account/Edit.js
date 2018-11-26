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

class Edit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            templateFilter:[],
            templateItems: [],
            formFilter:[],
            formItems: [],
            account:[],
            breadcrumb:[],
            copied: false,
            value: '',
        };

        this.handleCopyChange=this.handleCopyChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.searchHandler=this.searchHandler.bind(this);

    }

    componentWillMount(){

        const { match: { params } } = this.props;
        this.props.dispatch(accountActions.get_id_account(params.accountId));
        this.props.dispatch(templateActions.get_id_modal_template(2));

        var modalForm = [{'modal_id':2}, {'entity_id': params.accountId}]
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
        const { account } = this.props;
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


    render() {
        const {  account, template, form } = this.props;
        const { formItems} = this.state;

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

                                        {value.online === '0' ?
                                            <CopyToClipboard text={value.url}
                                                             onCopy={() => this.handleCopyChange(index)}>
                                                <LinkIcon/>
                                            </CopyToClipboard> :
                                            <div/>
                                        }
                                        {value.copied ? <span style={{color: 'red', fontSize:'12px'}}>Copied.</span> : null}

                                        <IconButton onClick={() => { history.push({pathname: '/web/form/modal/get/' + value.id,  state: [{ detail: this.props.account },{formDataID: value.form_data_id},{model: 'Account'}]})}}>
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