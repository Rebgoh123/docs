import React from 'react';
import { BootstrapTable } from 'react-bootstrap-table';
import history from '../../../routes/history'

import SearchIcon from '@material-ui/icons/Search';

export class DisplayBootstrapTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            target:'',
        };
    }

    componentWillMount(){
        this.state.target = this.props.type

    }
    render() {
    const {target} = this.state;
    const  options = {
            onRowClick: function(row) {
                history.push('/'+ target.toLowerCase() + '/' +  row.id);
            },
        };

        return (
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text searchIcon" id="basic-addon1"><SearchIcon/></span>
                </div>
                <input type="name" className="form-control" placeholder={this.props.type}  onChange={e => this.table.handleSearch(e.target.value)}  aria-label="Search"/>
            </div>

            <BootstrapTable
                tableHeaderClass='display-table'
                tableBodyClass='display-table'
                data={ this.props.data }
                ref={(component) => { this.table = component }}
                pagination
                tableStyle={{ overflowY: 'scroll'}}
                striped hover
                height='auto'
                // options={options}
            >
                {this.props.children}
            </BootstrapTable>
    </div>
        );
    }
}