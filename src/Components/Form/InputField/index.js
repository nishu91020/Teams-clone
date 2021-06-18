import React from 'react';
import './styles.css';
import { makeStyles, TextField } from '@material-ui/core';

const useStyle = makeStyles({
    input: {
        width: '250px',
        margin: '3%'
    }
});

const InputField = props => {
    const classes = useStyle();
    return (
        <div>
            <TextField
                type={props.type}
                className={classes.input}
                id="standard-basic"
                size="small"
                label={props.label}
            />
        </div>
    );
};

export default InputField;
