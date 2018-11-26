import React from 'react';
import { connect } from 'react-redux';
import { items,helper } from "./_constant";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/pindrop';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/settings';
import {MaterialUiTextfield} from "../Helper/MaterialUiTextfield";
import {MaterialUiSelect} from "../Helper/MaterialUiSelect";
import List from "./_button";
import Grid from '@material-ui/core/Grid';

import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/edit';
class SideMenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render()
    {
        const {value,form,handleNormalChange,validators,activeId} = this.props;

        return (

            <div>
                <Tabs
                    value={value}
                    onChange={this.props.handleTabChange}
                    fullWidth
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    <Tab icon={<PhoneIcon />} label="CURRENT" />
                    <Tab icon={<FavoriteIcon />} label="TOOLBOX" />
                    <Tab icon={<PersonPinIcon />} label="SETTINGS" />
                </Tabs>

                <div className="form-toolbox">
                    {(value === 0 ) &&
                    <div>
                        <MaterialUiTextfield
                            id="name"
                            name="name"
                            label="title"
                            value={form.name|| ''}
                            onChange={handleNormalChange}
                            validator={validators}
                        />
                        <MaterialUiTextfield
                            id="description"
                            name="description"
                            label="description"
                            value={form.description|| ''}
                            onChange={handleNormalChange}
                            multiline={true}
                            validator={validators}
                        />
                        <MaterialUiSelect
                            label="Type"
                            name='type'
                            id='type'
                            select={this.props.types}
                            value={form.type}
                            onChange={handleNormalChange}
                        />
                        <MaterialUiSelect
                            label="Modal"
                            name='modal'
                            id='modal'
                            select={this.props.modals}
                            value={form.modal}
                            onChange={handleNormalChange}
                        />

                        <FormControl className="formControl"
                                     fullWidth>
                            <InputLabel className="inputLabel" shrink={true}> Online * </InputLabel>
                            <FormControlLabel
                                style={{marginTop:'10px'}}
                                className="inputInput"
                                control={
                                    <Switch
                                        checked={form.online === true ? true : false}
                                        onChange={handleNormalChange}
                                        value="online"
                                        name="online"
                                    />
                                }
                            />
                        </FormControl>
                        {form.online === true ?
                            <MaterialUiTextfield
                                id="day"
                                name="day"
                                label="day"
                                value={form.day|| ''}
                                onChange={handleNormalChange}
                                validator={validators}
                            />
                            : <div/>}

                    </div>}

                    {value === 1 &&
                    <div>
                        {this.props.children}


                    </div>}

                    {value === 2 && <div>  {this.props.active == true ?

                    <div>
                    {this.props.handleEditInput(activeId)}
                    </div>
                    :
                    <div className="emptyPreview">
                    {this.props.newItems.length === 0 || undefined ?
                    "Start building by dragging the tool from the Toolbox!!!!"
                    :
                    <div>
                    Click on the <EditIcon/> Edit icon to edit!
                    </div>
                    }
                    </div>
                    }</div>}
                </div>

            </div>

        );
    }
}


const mapStateToProps = state => ({
    }
)

const SideMenu = connect(mapStateToProps)(SideMenuComponent);
export default(SideMenu);