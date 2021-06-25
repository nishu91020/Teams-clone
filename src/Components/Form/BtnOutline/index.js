import React from 'react';
import Button from '@material-ui/core/Button';
const BtnOutline = props => {
    return (
        <div style={{ margin: '2%' }}>
            <Button size="small" variant="outlined" color="primary">
                {props.content}
            </Button>
        </div>
    );
};

export default BtnOutline;
