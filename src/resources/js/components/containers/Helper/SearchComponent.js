import React from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className="CreatableSearchComponent noOptionsMessage"
            {...props.innerProps}
            style={{
                margin:'0',
                padding:'0',
            }}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: 'CreatableSearchComponent input',
                    ref: props.innerRef,
                    children: props.children,
                    ...props.innerProps,
                },
            }}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            style={{
                fontWeight: props.isSelected ? 500 : 400,
                fontSize:'14px',
                padding:'5px',
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className='CreatableSearchComponent placeholder'
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props) {
    return (
        <Typography className='CreatableSearchComponent singleValue'
               {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className='CreatableSearchComponent valueContainer'
                style={{
                    margin:'0',
                    padding:'0',
                }}>{props.children}</div>;
}

const SearchComponent = {
    Option,
    Control,
    NoOptionsMessage,
    Placeholder,
    SingleValue,
    ValueContainer,
};


export default SearchComponent;