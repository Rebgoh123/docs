import React from 'react';
import { connect } from 'react-redux';
import history from '../../../routes/history'

import {ReactDataGridTable} from '../Helper/ReactDataGridTable'

import {formActions} from "../../../actions/form.actions";

import CONFIG from "./Index";

import { Breadcrumb } from '../Menu/Breadcrumbs'
import {MaterialUiCircularProgress} from '../Helper/MaterialUiCircularProgress'
import MaterialUiButton from "../Helper/MaterialUiButton";

const columns = [
    { key: 'view', name: '', locked: true, width:40 },
    { key: 'id', name: 'ID', locked: true,sortable: true,filterable: true, width:100 },
    { key: 'name', name: 'Name', resizable: true,sortable: true,filterable: true },
    { key: 'description', name: 'Description', resizable: true,sortable: true,filterable: true },
    // { key: 'formType', name: 'Type', resizable: true, sortable: true,filterable: true },
    { key: 'size', name: 'No. Of Question', resizable: true, sortable: true,filterable: true },
    { key: 'statusType', name: 'Status', sortable: true,filterable: true,width:100 }
];

class FormPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb:[],
            rows:[],
            filters:[],

        };

    }

    componentWillMount(){
        this.state.breadcrumb = [ {name:"Home", link:"#"} , {name:"Form", link:"/web/form"} ];
        this.props.dispatch(formActions.get_all_form());
    }


    handleSubmit(event) {

        history.push('/web/form/add');

    }

    render() {
        const {  forms } = this.props;
        const { breadcrumb} = this.state;

        return (
            <div className="display">
                <div className="content">
                    <Breadcrumb routes={breadcrumb} />
                    <div className="div-menu-header">
                        <div className="menu-header">  {CONFIG.page} </div>

                    <div>
                        <MaterialUiButton onSubmit={this.handleSubmit} type="create" title="New"/>

                    </div>
                    </div>
                    <hr/>

                    { forms === undefined ?
                        <MaterialUiCircularProgress/> :

                        <ReactDataGridTable
                            model="form"
                            data = {forms}
                            columns ={columns} />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        forms : state.formReducer.initialize.forms,
    }
)

const connectedHomePage = connect(mapStateToProps)(FormPage);
export { connectedHomePage as FormPage };