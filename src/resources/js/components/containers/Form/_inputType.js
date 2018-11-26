import React from 'react';
import { connect } from 'react-redux';

import {MaterialUiTextfield} from "../Helper/MaterialUiTextfield";
import {MaterialUiTypography} from "../Helper/MaterialUITypography";
import {MaterialUiSelect} from "../Helper/MaterialUiSelect";
import {MaterialUiCheck} from "../Helper/MaterialUiCheck";
import {MaterialUiRadio} from "../Helper/MaterialUiRadio";
import {MyPdfViewer} from "../PDF/Display";

class InputComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount(){

    }

    typeOfInput(type) {

        switch (type) {
            case 'Text':
                return (
                    <MaterialUiTextfield
                        id={this.props.id}
                        name={this.props.name}
                        label={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                );
                break;
            case 'Date':


                return (
                    <MaterialUiTextfield
                        id={this.props.id}
                        name={this.props.name}
                        label={this.props.name}
                        value={this.props.value || ""}
                        type="date"
                        onChange={this.props.onChange}
                    />
                );
                break;
            case 'MultiLine':
                return (
                    <MaterialUiTextfield
                        id={this.props.id}
                        name={this.props.name}
                        label={this.props.name}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        multiline={true}
                        rows={this.props.rows}
                    />
                );
                break;
            case 'Header':
                return (
                    <MaterialUiTypography
                        id={this.props.id}
                        value={this.props.value}
                        type="Header"
                        onChange={this.props.onChange}
                    />
                );
                break;
            case 'Paragraph':
                return (
                    <MaterialUiTypography
                        id={this.props.id}
                        value={this.props.value}
                        type="Body1"
                        onChange={this.props.onChange}
                    />
                );
                break;
            case 'Select':
                return (
                    <MaterialUiSelect
                        id={this.props.id}
                        name={this.props.name}
                        label={this.props.name}
                        select={this.props.select}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        type={this.props.type}
                    />
                );
                break;
            case 'Checkbox':
                return (
                    <MaterialUiCheck
                        id={this.props.id}
                        name={this.props.name}
                        label={this.props.name}
                        check={this.props.select}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        type={this.props.type}
                        row={this.props.row}
                    />
                );
                break;
            case 'Radio':
                return (
                    <MaterialUiRadio
                        id={this.props.id}
                        name={this.props.name}
                        label={this.props.name}
                        radio={this.props.select}
                        value={this.props.value}
                        onChange={this.props.onChange}
                        type={this.props.type}
                        row={this.props.row}
                    />
                );
                break;
            case 'Image':
             //   console.log(this.props.imagePreviewUrl)
                return (
                    <img src={this.props.value}  />
                )
                break;
            case 'PDF':
                return (
                    <MyPdfViewer src={this.props.value}  />
                )
                break;
            default:
                ''
                break;
        }
    }


        render()
        {
            const {} = this.props;

            return (

                <div>
                    {this.typeOfInput(this.props.type)}
                </div>

            );
        }
    }


const mapStateToProps = state => ({
    }
)

const MyInput = connect(mapStateToProps)(InputComponent);
export default(MyInput);