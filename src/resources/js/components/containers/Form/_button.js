import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

import Button from '@material-ui/core/Button';
import HeaderIcon from '@material-ui/icons/title';
import ParagraphIcon from '@material-ui/icons/formatalignjustify';
import DateIcon from '@material-ui/icons/daterange';
import TextfieldIcon from '@material-ui/icons/textfields';
import MultifieldIcon from '@material-ui/icons/formatlinespacing';
import CheckboxIcon from '@material-ui/icons/checkbox';
import RadioButtonIcon from '@material-ui/icons/radiobuttonchecked';
import SelectIcon from '@material-ui/icons/expandmore';
import ImageIcon from '@material-ui/icons/image';
import PDFIcon from '@material-ui/icons/librarybooks';

const style = {
    menu:{
        // background: '#313131',
        color: 'black'
    },
    icon:{
        color: 'white',
    },
    smallIcon: {
        width: 36,
        height: 36,
    },
}


const itemSource = {
    beginDrag(props) {
        return props.item;
    },
    endDrag(props, monitor, component) {
        if (!monitor.didDrop()) {
            return;
        }

        return props.handleDrop(props.item.id);
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

class List extends Component {

    handleIcon(name){
        switch(name){

            case "Header":
                return <HeaderIcon  style={style.icon} />
            case "Paragraph":
                return <ParagraphIcon style={style.icon} />
            case "Date":
                return <DateIcon style={style.icon} />
            case "Text":
                return <TextfieldIcon style={style.icon} />
            case "MultiLine":
                return <MultifieldIcon style={style.icon} />
            case "Number":
                return <Number style={style.icon} />
            case "Radio":
                return <RadioButtonIcon style={style.icon} />
            case "Select":
                return <SelectIcon  style={style.icon} />
            case "Checkbox":
                return <CheckboxIcon  style={style.icon} />
            case "Image":
                return <ImageIcon  style={style.icon} />
            case "PDF":
                return <PDFIcon  style={style.icon} />
            default:
                return "";
        }
    }

    render() {
        const { isDragging, connectDragSource, item } = this.props;
        const opacity = isDragging ? 0 : 1;

        return connectDragSource(

            <div style={{ opacity }}>

                {item.name === 'Image' || item.name === 'PDF' ?
                    <div>
                        <input
                            accept={item.name === 'Image' ? "image/*" : "application/pdf"}
                            style={{display:'none'}}
                            id={"flat-button-file-editor-"+item.name  }
                            multiple
                            type="file"
                            onChange={(e)=>this.props.handleClick()}
                        />
                        <label htmlFor={"flat-button-file-editor-" + item.name }>
                            <Button variant="extendedFab"  htmlFor="flat-button-file" className="toolbox-button" component="span" >
                                {this.handleIcon(item.name)}
                                {item.name}
                            </Button>
                        </label>
                    </div>
                     :
                    <Button variant="extendedFab" onClick={(e) => this.props.handleClick()} className={this.props.className} >
                        {this.handleIcon(item.name)}
                        {item.name}
                    </Button>
                }

            </div>


        );
    }
}

export default DragSource('item', itemSource, collect)(List);
