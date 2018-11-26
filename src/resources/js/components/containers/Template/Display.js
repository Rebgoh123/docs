import React from 'react';
import { connect } from 'react-redux';
import history from '../../../routes/history'

import {ReactDataGridTable} from '../Helper/ReactDataGridTable'

import {templateActions} from "../../../actions/template.actions";

import CONFIG from "./Index";

import { Breadcrumb } from '../Menu/Breadcrumbs'
import {MaterialUiCircularProgress} from '../Helper/MaterialUiCircularProgress'
import MaterialUiButton from "../Helper/MaterialUiButton";

const columns = [
    { key: 'view', name: '', locked: true, width:40 },
    { key: 'id', name: 'ID', locked: true,sortable: true,filterable: true, width:100 },
    { key: 'name', name: 'Name', resizable: true,sortable: true,filterable: true },
    { key: 'description', name: 'Description', resizable: true,sortable: true,filterable: true },
    { key: 'type', name: 'Type', resizable: true, sortable: true,filterable: true },
    { key: 'statusType', name: 'Status', sortable: true,filterable: true,width:100 }
];

class TemplatePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            breadcrumb:[],
        };

    }

    componentWillMount(){
        this.state.breadcrumb = [ {name:"Home", link:"#"} , {name:"Template", link:"/web/template"} ];
        this.props.dispatch(templateActions.get_all_template());
    }


    handleSubmit(event) {

        history.push('/web/template/add');

    }

    render() {
        const {  template } = this.props;
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

                    { template === undefined ?
                        <MaterialUiCircularProgress/> :

                        <ReactDataGridTable
                            model="template"
                            data = {template}
                            columns ={columns} />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
        template : state.templateReducer.initialize.templates,
    }
)

const connectedHomePage = connect(mapStateToProps)(TemplatePage);
export { connectedHomePage as TemplatePage };