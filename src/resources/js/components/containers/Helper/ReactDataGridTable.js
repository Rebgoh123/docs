import React from 'react';

import ReactDataGrid from 'react-data-grid';
import { Toolbar, Data} from 'react-data-grid-addons';
const { Selectors } = Data;

import history from '../../../routes/history'

export class ReactDataGridTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns:[],
            rows:[],
            filters:[],
            model :''

        };

        this.getRows = this.getRows.bind(this);
        this.getCellActions=this.getCellActions.bind(this);
    }

    componentWillMount(){
        this.state.columns = this.props.columns;
    }

    getCellActions(column, row) {
        if (column.key === 'view') {
            return [
                {
                    icon:  'fa fa-eye fa-2x text-secondary',
                    callback: () => {   history.push("/web/" +  this.props.model + "/get/" + row.id); }
                },
            ];
        }
    }

    handleGridSort = (sortColumn, sortDirection) => {
        let originalRows = this.state.rows;
        //let originalRows = this.props.clients;
        let row = originalRows.slice(0);

        const comparer = (a, b) => {
            if (sortDirection === 'ASC') {
                return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
            } else if (sortDirection === 'DESC') {
                return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
            }
        };

        const rows = sortDirection === 'NONE' ? originalRows.slice(0) : row.sort(comparer);

        this.setState({ rows });
    };

    getRows = () => {
        if(this.state.rows.length === 0) {
            this.state.rows= this.props.data;
        }
        return Selectors.getRows(this.state);
    };

    getSize = () => {
        return this.getRows().length;
    };

    rowGetter = (rowIdx) => {
        let rows = this.getRows();
        return rows[rowIdx];
    };

    handleFilterChange = (filter) => {
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        this.setState({ filters: newFilters });
    };

    onClearFilters = () => {
        // all filters removed
        this.setState({filters: {} });
    };

    handleFilterChange = (filter) => {
        let newFilters = Object.assign({}, this.state.filters);
        if (filter.filterTerm) {
            newFilters[filter.column.key] = filter;
        } else {
            delete newFilters[filter.column.key];
        }
        this.setState({ filters: newFilters });
    };

    onClearFilters = () => {
        // all filters removed
        this.setState({filters: {} });
    };


    render() {
        const { columns} = this.state;
        return (
            <ReactDataGrid
                headerRowHeight={50}
                rowHeight={50}
                onGridSort={this.handleGridSort}
                columns={columns}
                rowGetter={this.rowGetter}
                enableCellSelect={true}
                rowsCount={this.getSize()}
                minHeight={600}
                minColumnWidth={120}
                toolbar={<Toolbar enableFilter={true}/> }
                onAddFilter={this.handleFilterChange}
                onClearFilters={this.onClearFilters}
                className='display-table'
                getCellActions={this.getCellActions}/>
        );
    }
}