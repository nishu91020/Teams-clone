import React, { useState, useContext } from 'react';
import { Form } from '../../Components/Form';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Paper, Grid } from '@material-ui/core';
import { VideoContext } from '../../Context/VideoContext';
import Preview from '../../Components/Preview';
const useStyles = makeStyles({
    form: {
        padding: '2%',
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
});

const CreateRoom = () => {
    const classes = useStyles();
    const [ name, setName ] = useState('');
    const { room } = useContext(VideoContext);
    return (
        <div>
            <Paper className={classes.form}>
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg"
                    width="34"
                    height="34"
                    alt="Teams"
                />
                <Form.Title heading="Create a room" />
                <Grid container spacing={2}>
                    <Grid Item>
                        <Preview />
                    </Grid>

                    <Grid Item>
                        <TextField
                            label="Name"
                            className={classes.input}
                            value={name}
                            type="text"
                            size="small"
                            id="outlined-basic"
                            onChange={e => setName(e.target.value)}
                        />
                        <div onClick={room}>
                            <Form.BtnOutline content="Create" />
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default CreateRoom;
