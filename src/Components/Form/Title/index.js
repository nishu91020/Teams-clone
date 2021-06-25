import React from 'react';

const Title = props => {
    return (
        <div style={{ fontFamily: 'Lato', fontSize: '25px', padding: '3%', fontWeight: 'bold' }}>{props.heading}</div>
    );
};

export default Title;
