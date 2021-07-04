import React from 'react';
import { List, ListItem, Avatar, ListItemAvatar, ListItemText } from '@material-ui/core';
const ParticipantCard = props => {
    return (
        <List>
            <ListItem>
                <ListItemAvatar>
                    <Avatar color="parimary">{props.name.charAt(0).toUpperCase()}</Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.name.toUpperCase()} />
            </ListItem>
        </List>
    );
};

export default ParticipantCard;
