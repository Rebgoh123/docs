import React from 'react';
import { connect } from 'react-redux';

import {ReactDataGridTable} from '../Helper/ReactDataGridTable'

import history from '../../../routes/history'
import {accountActions} from "../../../actions/account.actions";

import CONFIG from "./Index";

import { Breadcrumb } from '../Menu/Breadcrumbs'
import {MaterialUiCircularProgress} from '../Helper/MaterialUiCircularProgress'

const columns = [
    { key: 'view', name: '', locked: true, width:40 },
    { key: 'id', name: 'ID', locked: true,sortable: true,filterable: true, width:100 },
    { key: 'FullName', name: 'Name', resizable: true,sortable: true,filterable: true },
    { key: 'address', name: 'Address', resizable: true,sortable: true,filterable: true },
    { key: 'PostalCode', name: 'Postal Code', resizable: true, sortable: true,filterable: true,width:150 },
    { key: 'addressType', name: 'Address Type', resizable: true, sortable: true,filterable: true },
    { key: 'effectiveOn', name: 'Effective On', sortable: true,filterable: true,width:100 }
      ];

class AccountPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb:[],
            rows:[],
            filters:[],

        };

    }

    componentWillMount(){
        this.state.breadcrumb = [ {name:"Home", link:"#"} , {name:"Account", link:"/web/account"} ];

        this.props.dispatch(accountActions.get_all_account());
    }


    render() {
        const {  accounts } = this.props;
        const { breadcrumb} = this.state;

        return (
            <div className="display">
            <div className="content">
            <Breadcrumb routes={breadcrumb} />
        <div className="div-menu-header">
            <div className="menu-header">  {CONFIG.page} </div>
        </div>

        <hr/>

        { accounts === undefined ?
        <MaterialUiCircularProgress/> :

    <ReactDataGridTable
        model="account"
        data = {accounts}
        columns ={columns} />
    }
            </div>
            </div>
    );
    }
}

const mapStateToProps = state => ({
        accounts : state.accountReducer.initialize.accounts,
    }
)

const connectedHomePage = connect(mapStateToProps)(AccountPage);
export { connectedHomePage as AccountPage };