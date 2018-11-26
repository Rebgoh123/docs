import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

const update = require('immutability-helper');

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        hovered: monitor.isOver(),
        item: monitor.getItem(),
        canDrop: monitor.canDrop()
    }
}

class _target extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render() {
        const { connectDropTarget, hovered, item,canDrop } = this.props;
        // const backgroundColor = hovered ? 'lightgreen' : 'white';

        const isActive = hovered && canDrop
        let backgroundColor = 'white'
        if (isActive) {
            backgroundColor = '#D1D1CD'
        } else if (canDrop) {
            backgroundColor = '#C3C6DE'
        }

        return connectDropTarget(
            <div className="form-preview" style={{ background: backgroundColor }}>
                {this.props.children}
            </div>
        );
    }
}

export default DropTarget('item', {}, collect)(_target);
