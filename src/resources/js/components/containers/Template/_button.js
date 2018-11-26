import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import BOLD from '@material-ui/icons/formatbold';
import UNDERLINE from '@material-ui/icons/formatunderlined';
import ITALIC from '@material-ui/icons/formatitalic';
import STRIKETHROUGH from '@material-ui/icons/strikethroughs';

import FormatListBulleted from '@material-ui/icons/formatlistbulleted';
import FormatListNumbered from '@material-ui/icons/formatlistnumbered';
import BlockQuote  from '@material-ui/icons/label';
import CodeBlock from '@material-ui/icons/code';
import LeftAlign from '@material-ui/icons/formatalignleft';
import CenterAlign from '@material-ui/icons/formataligncenter';
import RightAlign from '@material-ui/icons/formatalignright';
import JustifyAlign from '@material-ui/icons/formatalignjustify';

import Image from '@material-ui/icons/addphotoalternate';
import Line from '@material-ui/icons/remove';


import SimAddress from '@material-ui/icons/accountbalance';
import ClientAddress from '@material-ui/icons/home';
import ClientName from '@material-ui/icons/accountcircle';
import SimLogo from '@material-ui/icons/collections';
import SignOff from '@material-ui/icons/brush';

import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";


const style = {
    menu:{
        color: 'black'
    },
    icon:{
        color: 'black'
    }
}

class ToolboxButton extends Component {

    handleIcon(name){
        // console.log(name)
        switch(name){

            case "BOLD":
                return <BOLD style={style.icon} />
            case "UNDERLINE":
                return <UNDERLINE style={style.icon} />
            case "ITALIC":
                return <ITALIC style={style.icon} />
            case "STRIKETHROUGH":
                return <STRIKETHROUGH style={style.icon} />
            case "blockquote":
                return <BlockQuote  style={style.icon} />
            case "code-block":
                return <CodeBlock style={style.icon} />
            case "unordered-list-item":
                return <FormatListBulleted style={style.icon} />
            case "ordered-list-item":
                return <FormatListNumbered  style={style.icon} />
            case "rightAlignment":
                return <RightAlign  style={style.icon} />
            case "centerAlignment":
                return <CenterAlign  style={style.icon} />
            case "leftAlignment":
                return <LeftAlign  style={style.icon} />
            case "justifyAlignment":
                return <JustifyAlign  style={style.icon} />
            case "simAddress":
                return <SimAddress  style={style.icon} />
            case "Address":
                return <ClientAddress  style={style.icon} />
            case "FullName":
                return <ClientName  style={style.icon} />
            case "simLogo":
                return <SimLogo  style={style.icon} />
            case "signOff":
                return <SignOff  style={style.icon} />
            case "image":
                return <Image  style={style.icon} />
            case'line':
                return <Line style={style.icon} />
            default:
                return "";
        }
    }

    render() {

        return (
            <Tooltip title={this.props.tooltip}>


                {this.props.inputType === 'file' ?
                  <label htmlFor={"flat-button-file-editor"}>
                        <input
                            accept={'Image'}
                            style={{display:'none'}}
                            id={"flat-button-file-editor" }
                            multiple
                            type="file"
                            onChange={(e)=>this.props.onChange()}
                        />

                            <Button variant="outlined"   className="toolboxBtn" component="span" >
                                {this.handleIcon(this.props.name)}

                            </Button>
                        </label>

                       :
                    this.props.name==='simLogo' ?
                            <Button variant="outlined" className="toolboxBtn" onClick={(e) => this.props.onChange()}>
                {this.handleIcon(this.props.name)}
                    </Button>
                      :
                        <Button variant="outlined" className="toolboxBtn" onClick={(e) => this.props.handleClick()}>
                    {this.handleIcon(this.props.name)}
                    </Button>



                }

            </Tooltip>
        );
    }
}

export const ToolboxBtn = (props) => {
    return (
            <ToolboxButton
                name={props.name}
                tooltip={props.tooltip}
                inputType={props.inputType}
                handleClick={props.handleClick}
                onChange={props.onChange}
                src={props.src}
            />

    );
};

class ToolboxSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type: [],
        };

    }

    componentWillMount(){
        var name = this.props.name
        var assignedType

        switch(name) {
            case 'header':
                assignedType=  [
                    {label: 'H1', value:'header-one'},
                    {label: 'H2', value:'header-two'},
                    {label: 'H3', value:'header-three'},
                    {label: 'H4', value:'header-four'},
                    {label: 'H5', value:'header-five'},
                    {label: 'H6', value:'header-six'},
          ];
                break;
            case 'color':
                assignedType=  [
                    {label: 'Black', style: 'black',value:'black'},
                    {label: 'Red', style: 'red',value:'red'},
                    {label: 'Orange', style: 'orange',value:'orange'},
                    {label: 'Yellow', style: 'yellow',value:'yellow'},
                    {label: 'Green', style: 'green',value:'green'},
                    {label: 'Blue', style: 'blue',value:'blue'},
                    {label: 'Indigo', style: 'indigo',value:'indigo'},
                    {label: 'Violet', style: 'violet',value:'violet'},
                    {label: 'font size 8 ', style: '8',value:'8'}];
                break;
            case 'fontSize':
                assignedType=  [
                    {label: '8', style: '8',value:'8'},
                    {label: '9', style: '9',value:'9'},
                    {label: '10', style: '10',value:'10'},
                    {label: '11', style: '11',value:'8'},
                    {label: '12', style: '12',value:'12'},
                    {label: '14', style: '14',value:'14'},
                    {label: '16', style: '16',value:'16'},
                    {label: '18', style: '18',value:'18'},
                    {label: '24', style: '24',value:'24'},
                    {label: '30', style: '30',value:'30'},
                    {label: '36', style: '36',value:'36'},
                    {label: '48', style: '48',value:'48'},
                    {label: '60', style: '60',value:'60'},
                    {label: '72', style: '72',value:'72'},
                    {label: '96', style: '96',value:'96'}];
                break;
            case 'Select':
                assignedType=  this.props.select
                break;
            default:
                ''
        }

        this.setState({ type:assignedType });

    }

    render() {

        const {type} = this.state;

        return (
            <FormControl className="formControl" required={false}>

                <Select
                    name={this.props.name}
                    id={this.props.id}
                    className="toolboxSelect"
                    value={this.props.value}
                    onChange={this.props.onChange}
                >
                    {type.map((value, index) => (
                        <MenuItem className="toolboxSelectInner" key={index} value={value.value}>{value.label}</MenuItem>
                    ))}

                </Select>
            </FormControl>

        );
    }
}

export const ToolboxSel = (props) => {
    return (
        <ToolboxSelect
            name={props.name}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
        />

    );
};