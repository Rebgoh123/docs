import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/edit';
import { findDOMNode } from 'react-dom';
import {
    DragSource,
    DropTarget,
    ConnectDropTarget,
    ConnectDragSource,
    DropTargetMonitor,
    DropTargetConnector,
    DragSourceConnector,
    DragSourceMonitor,
} from 'react-dnd';
import { XYCoord } from 'dnd-core';
import flow from 'lodash/flow';

import Button from '@material-ui/core/Button';
import MyInput from "./_inputType";

const style = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    marginBottom: '.5rem',
    backgroundColor: 'white',
    cursor: 'move',
};

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        }
    },
};

const cardTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = (findDOMNode(
            component,
        )).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = (clientOffset).y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }

        // Time to actually perform the action
        props.moveCard(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
}

class _card extends React.Component {
    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        isDragging: PropTypes.bool.isRequired,
        moveCard: PropTypes.func.isRequired,
    }

    render() {
        const {
            type,
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props;
        const opacity = isDragging ? 0 : 1;

        return (
            connectDragSource &&
            connectDropTarget &&
            connectDragSource(
                connectDropTarget(

                    <div style={{ ...style, opacity }} >

                            <Grid container>
                                <Grid item xs>

                        <MyInput type={type}
                                 id={this.props.input.id}
                                 name={this.props.input.name}
                                 label={this.props.input.name}
                                 select={this.props.input.select}
                                 value={this.props.input.value}
                                 onChange={this.props.handleChange}
                                 rows={this.props.input.rows || ''}
                                 imagePreviewUrl={this.props.input.imageUrl}
                                 row={this.props.input.row}
                        />

                                </Grid>
                                <Grid item xs={1}>
                                    <div className="toolbox-side-button-group">
                                        {type === "PDF" ? <div/> :
                                            <Button onClick={this.props.editCard} variant="outlined"
                                                    className="toolbox-side-button"
                                                    style={{border: 'none', backgroundColor: '#5DB786'}}>
                                                <EditIcon style={{color: '#fff', width: 20, height: 20,}}/>
                                            </Button>
                                        }
                                    <Button onClick={this.props.removeCard} variant="outlined" className="toolbox-side-button" style={{border:'none',backgroundColor:'#FF5964'}}>
                                        <DeleteIcon style={{color:'#fff',  width: 20, height: 20,}} />
                                    </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>


                ),
            )
        );
    }
}

export default flow(
    DragSource(
        'card',
        cardSource,
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        }),
    ),
    DropTarget('card', cardTarget, (connect) => ({
        connectDropTarget: connect.dropTarget(),
    }))
)(_card);
