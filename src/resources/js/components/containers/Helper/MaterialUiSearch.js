import React from 'react';

import SearchComponent from './SearchComponent'

import InputLabel from '@material-ui/core/InputLabel';

import CreatableSelect from 'react-select/lib/Creatable';
import Select from 'react-select';

export class MaterialUiSearch extends React.Component {
    Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    render() {

        return (
            <div>

                <InputLabel className="inputLabelCreatable"  shrink={false} htmlFor={this.props.id}>{this.Capitalize(this.props.label)}</InputLabel>
                <div className="CreatableSearchComponent">

                    {this.props.type==='select' ?

                    <Select
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        components={SearchComponent}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        options={this.props.options}
                        placeholder={"Please select a " + this.props.label}
                    />
                        :

                    <CreatableSelect
                        isClearable
                        components={SearchComponent}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        options={this.props.options}
                        placeholder={"Please select a " + this.props.label}
                    />

                    }

                </div>

            </div>
        );
    }
}