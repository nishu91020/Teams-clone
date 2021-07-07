import React, { useState } from 'react';
import { Grid, makeStyles, Menu, MenuItem } from '@material-ui/core';
import MeetingChatCard from '../MeetingChatCard';
import { MoreVert } from '@material-ui/icons';
import JoinDialog from '../JoinDialog';
import CreateDialog from '../CreateDialog';
import JoinMessage from '../JoinMessage';
import './styles.css';

const useStyles = makeStyles({
    chatContainer: {
        backgroundColor: '#EFEEEE',
        height: '9%',
        padding: '1%',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    meetingList: {
        padding: '2px',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '90%'
    }
});
const MeetingChatList = () => {
    const classes = useStyles();
    const [ isJoinDialogOpen, setIsJoinDialogOpen ] = useState(false);
    const [ isCreateDialogOpen, setIsCreateDialogOpen ] = useState(false);
    const [ isJoinMessageDialogOpen, setIsJoinMessageDialogOpen ] = useState(false);
    const [ anchorEl, setAnchorEl ] = useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleJoinDialogClose = () => {
        setIsJoinDialogOpen(false);
    };
    const handleJoinDialog = () => {
        setIsJoinDialogOpen(true);
        <JoinDialog handleClose={handleJoinDialogClose} open={isJoinDialogOpen} />;
    };
    const handleCreateDialogClose = () => {
        setIsCreateDialogOpen(false);
    };
    const handleCreateDialog = () => {
        setIsCreateDialogOpen(true);
        <CreateDialog handleClose={handleCreateDialogClose} open={isCreateDialogOpen} />;
    };
    const handleJoinMessageDialogClose = () => {
        setIsJoinMessageDialogOpen(false);
    };
    const handleJoinMessageDialog = () => {
        setIsJoinMessageDialogOpen(true);
        <JoinMessage handleClose={handleJoinMessageDialogClose} open={isJoinMessageDialogOpen} />;
    };
    return (
        <Grid container item style={{ height: '100%', overflowY: 'hidden' }}>
            <Grid container item className={classes.chatContainer} alignItems="center" justify="space-between">
                Chats
                <MoreVert onClick={handleClick} />
                <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleJoinDialog}>Create Meeting</MenuItem>
                    <MenuItem onClick={handleCreateDialog}>Join Meeting</MenuItem>
                    <MenuItem onClick={handleJoinMessageDialog}>Join Chats</MenuItem>
                </Menu>
            </Grid>

            <Grid container item className={classes.meetingList}>
                <MeetingChatCard />
                <MeetingChatCard />
                <MeetingChatCard />
                <MeetingChatCard />
                <MeetingChatCard />
                <MeetingChatCard />
                <MeetingChatCard />
                <MeetingChatCard />
                <MeetingChatCard />
                <MeetingChatCard />
                <MeetingChatCard />
                <MeetingChatCard />
            </Grid>
        </Grid>
    );
};

export default MeetingChatList;
