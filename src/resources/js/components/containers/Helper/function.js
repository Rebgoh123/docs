import React from "react";

import {MaterialUiTextfield} from "./MaterialUiTextfield";
import Button from "@material-ui/core/Button/Button";
import AddIcon from "@material-ui/core/SvgIcon/SvgIcon";

import Avatar from '@material-ui/core/Avatar';
import CompletedIcon from '@material-ui/icons/checkbox';
import IncompletedIcon from '@material-ui/icons/checkboxoutlineblank';

export const CompletedAvatar = () => {
    return (
        <Avatar style={{background:'#548687'}}>  <CompletedIcon />  </Avatar>

    );
};

export const IncompletedAvatar = () => {
    return (
        <Avatar style={{background:'#D36582'}}> <IncompletedIcon  />    </Avatar>

    );
};

export const findArrayElementById = (array, id) => {
    return array.find((element) => {
        return element.id === id;
    })
}


export const handleEditInput = (items,id) => {
    const {newItems } = this.state;
    var a = findArrayElementById(newItems,id)

    var input=  a == undefined ? '' : a['type'];

    switch(input) {
        case 'Date' :
        case 'Text' :
            return (
                <MaterialUiTextfield
                    id="title"
                    name="name"
                    label="name"
                    value={a['name'] || ''}
                    onChange={(e) => this.handleInputChanges(id,'',e)}
                />
            )
            break;
        case 'Header' :
            return (
                <MaterialUiTextfield
                    id="header"
                    name="name"
                    label="Header Content"
                    value={a['value'] || ''}
                    onChange={(e) => this.handleInputChanges(id,'',e)}
                />
            )
            break;

        case 'Paragraph' :
            return (
                <MaterialUiTextfield
                    id="paragraph"
                    name="name"
                    label="Paragraph Content"
                    value={a['value'] || ''}
                    onChange={(e) => this.handleInputChanges(id,'',e)}
                    multiline={true}
                />
            )
            break;
        case 'MultiLine' :
            return (
                <div>
                    <MaterialUiTextfield
                        id="title"
                        name="name"
                        label="name"
                        value={a['name'] || ''}
                        onChange={(e) => this.handleInputChanges(id,'',e)}
                    />
                    <MaterialUiTextfield
                        id="MultiLineRow"
                        name="rows"
                        label="MultiLine Row"
                        value={a['rows'] || ''}
                        onChange={(e) => this.handleInputChanges(id,'',e)}
                        multiline={true}
                    />
                </div>
            )
            break;
        case 'Radio' :
            return (
                <div>
                    <Button onClick={(e) => this.handleAddOption(id,"radio",e)} variant="extendedFab" style={{border:'none',backgroundColor:'transparent', color: '#2AB7CA',fontSize:'12px'}}>
                        <AddIcon/> New Radio Option
                    </Button>

                    <MaterialUiTextfield
                        id="title"
                        name="name"
                        label="name"
                        value={a['name'] || ''}
                        onChange={(e) => this.handleInputChanges(id,'',e)}
                    />
                    <hr/>
                    {a['select'].map((object, i) => (
                        <div key={i}>
                            <Button onClick={(e) => this.handleRemoveOption(id,i,"radio",e)} variant="extendedFab" style={{marginTop:'5px',border:'grey',backgroundColor:'transparent', color:'#FF5964', fontSize:'12px'}}>
                                <RemoveIcon/> { "Remove Radio Button " + i }
                            </Button>

                            <MaterialUiTextfield
                                id="title"
                                name="label"
                                label={"Radio Button Label " + i }
                                value={object['label'] || ''}
                                onChange={(e) => this.handleInputChanges(id,i,e)}
                            />

                            <MaterialUiTextfield
                                id="title"
                                name="value"
                                label={"Radio Button Label " + i + " Value " }
                                value={object['value'] || ''}
                                onChange={(e) => this.handleInputChanges(id,i,e)}
                                multiline={true}
                            />
                        </div>
                    ))}


                </div>
            )
            break;
        case 'Select' :
            return (
                <div>
                    <Button onClick={(e) => this.handleAddOption(id,"select",e)} variant="extendedFab" style={{border:'none',backgroundColor:'transparent', color: '#2AB7CA',fontSize:'12px'}}>
                        <AddIcon/> New Select Option
                    </Button>

                    <MaterialUiTextfield
                        id="title"
                        name="name"
                        label="name"
                        value={a['name'] || ''}
                        onChange={(e) => this.handleInputChanges(id,'',e)}
                    />
                    <hr/>

                    {a['select'].map((object, i) => (

                        <div key={i}>
                            <Button onClick={(e) => this.handleRemoveOption(id,i,"select",e)} variant="extendedFab" style={{marginTop:'5px',border:'grey',backgroundColor:'transparent', color:'#FF5964', fontSize:'12px'}}>
                                <RemoveIcon/> { "Remove Select Option " + i }
                            </Button>
                            <MaterialUiTextfield
                                id="title"
                                name="label"
                                label={"Select Option Label " + i }
                                value={object['label'] || ''}
                                onChange={(e) => this.handleInputChanges(id,i,e)}
                            />

                            <MaterialUiTextfield
                                id="title"
                                name="value"
                                label={"Select Option Label " + i + " Value " }
                                value={object['value'] || ''}
                                onChange={(e) => this.handleInputChanges(id,i,e)}
                                multiline={true}
                            />

                            <hr/>
                        </div>

                    ))}


                </div>
            )
            break;

        case 'Checkbox' :
            return (
                <div>
                    <Button onClick={(e) => this.handleAddOption(id,"check",e)} variant="extendedFab" style={{border:'none',backgroundColor:'transparent', color: '#2AB7CA',fontSize:'12px'}}>
                        <AddIcon/> New Checkbox Option
                    </Button>


                    <MaterialUiTextfield
                        id="title"
                        name="name"
                        label="name"
                        value={a['name'] || ''}
                        onChange={(e) => this.handleInputChanges(id,'',e)}
                    />
                    <hr/>
                    {a['select'].map((object, i) => (
                        <div key={i}>

                            <Button onClick={(e) => this.handleRemoveOption(id,i,"check",e)} variant="extendedFab" style={{marginTop:'5px',border:'grey',backgroundColor:'transparent', color:'#FF5964', fontSize:'12px'}}>
                                <RemoveIcon/> { "Remove Checkbox Option " + i }
                            </Button>

                            <MaterialUiTextfield
                                id="title"
                                name="label"
                                label={"Select Option Label " + i }
                                value={object['label'] || ''}
                                onChange={(e) => this.handleInputChanges(id,i,e)}
                            />

                            <MaterialUiTextfield
                                id="title"
                                name="value"
                                label={"Select Option Label " + i + " Value " }
                                value={object['value'] || ''}
                                onChange={(e) => this.handleInputChanges(id,i,e)}
                            />
                        </div>

                    ))}


                </div>
            )
            break;
        default:
            return(<div/>)
            break;
    }

}
