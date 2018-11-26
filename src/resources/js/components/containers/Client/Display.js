import React from 'react';
import { connect } from 'react-redux';

import {ReactDataGridTable} from '../Helper/ReactDataGridTable'

import history from '../../../routes/history'
import {clientActions} from "../../../actions/client.actions";

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

class ClientPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb:[],
            rows:[],
            filters:[],

        };

    }

    componentWillMount(){
        this.state.breadcrumb = [ {name:"Home", link:"#"} , {name:"Client", link:"/web/client"} ];

        this.props.dispatch(clientActions.get_all_client());
    }


    render() {
        const {  clients } = this.props;
        const { breadcrumb} = this.state;

        return (
            <div className="display">
            <div className="content">
            <Breadcrumb routes={breadcrumb} />
        <div className="div-menu-header">
            <div className="menu-header">  {CONFIG.page} </div>
        </div>

        <hr/>

        { clients === undefined ?
        <MaterialUiCircularProgress/> :

    <ReactDataGridTable
        model="client"
        data = {clients}
        columns ={columns} />
    }
            </div>
            </div>
    );
    }
}

const mapStateToProps = state => ({
        clients : state.clientReducer.initialize.clients,
    }
)

const connectedHomePage = connect(mapStateToProps)(ClientPage);
export { connectedHomePage as ClientPage };