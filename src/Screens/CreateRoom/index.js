import React, { useState, useContext, useEffect } from 'react';
import { Form } from '../../Components/Form';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Grid } from '@material-ui/core';
import { VideoContext } from '../../Context/VideoContext';
import Preview from '../../Components/Preview';
const useStyles = makeStyles({
    input: {
        width: '240px',
        margin: '4%',
        display: 'flex'
    },
    container: {
        padding: '2%',
        height: '93vh',
        width: '100vw',
        display: 'flex'
    },
    form: {
        height: '40%'
    }
});

const CreateRoom = () => {
    const classes = useStyles();
    const { state, generateToken } = useContext(VideoContext);
    const [ name, setName ] = useState('');

    const handleEnter = () => {
        console.log(state.room.uniqueName);
        generateToken(state.room.uniqueName, name);
    };
    return (
        <Grid item className={classes.container} container xs={12} justify="center" direction="row" alignItems="center">
            <Grid item container xs={12} sm={6}>
                <Preview />
            </Grid>
            <Grid
                item
                className={classes.form}
                container
                sm={3}
                xs={12}
                direction="column"
                alignItems="center"
                justify="space-evenly"
            >
                <Form.Title heading="Create a room" />
                <TextField
                    label="Name"
                    className={classes.input}
                    value={name}
                    type="text"
                    size="small"
                    id="outlined-basic"
                    variant="outlined"
                    onChange={e => setName(e.target.value)}
                />
                <div onClick={handleEnter}>
                    <Form.BtnForm content="Enter" />
                </div>
            </Grid>
        </Grid>
    );
};

export default CreateRoom;
