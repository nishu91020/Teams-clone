import React from 'react';
import { Button } from '@material-ui/core';
const BtnForm = props => {
    return (
        <div>
            <Button variant="contained" color="primary">
                {props.content}
            </Button>
        </div>
    );
};

export default BtnForm;
