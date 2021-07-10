import React,{useState,useContext,useEffect} from 'react';
import { TextField, Grid, makeStyles, Button,Typography } from '@material-ui/core';
import history from '../../history';
import {UserContext} from '../../Context/AuthContext';
import { Share } from '@material-ui/icons';
import LocalMessage from '../LocalMessage';
import {addMessage,getMessage} from '../../db';
import CopyToClipboard from 'react-copy-to-clipboard';

import './styles.css';
const useStyles = makeStyles({
    chatContainer: {
        backgroundColor: '#EFEEEE',
        height: '9%',
        padding: '1%',
        fontSize: '120%',
        fontWeight: 'bold'
    },
    joinBtn: {
        justiy: 'flex-end'
    },
    chatInput: {
        padding: '1px',
        borderRadius: '5px'
    },
    msgList: {
        paddingLeft: '2px',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '83%',
        width: '100%'
    }
});
const RoomChatCard = ({ room }) => {
    const classes = useStyles();
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([])
    const {state:authState} =useContext(UserContext);
    useEffect(()=>{
    const callback=(snapshot)=>{
        const messageList=[];
        snapshot.forEach(res=>{
            messageList.push(res.data());
        })
        setMessages(messageList);
        
    }
    getMessage(room?.roomId,callback);
    },[room])
    console.log(room);
    const handleJoin=()=>{
        history.push(`/Preview/${room.roomId}`);
    }
    const handleSend=()=>{
        addMessage(room?.roomId,{sentAt:new Date().toISOString(),message,sentBy:authState.user});
        setMessage('');
    }
    const handleKeyPress=(e)=>{
        if(e.keyCode ===13)
            handleSend();
    }
    
    return (
        <Grid container item style={{ height: '100%', width: '100%',backgroundColor: '#FEFFFF' }} direction="column">
            <Grid container item className={classes.chatContainer} justify="space-between">
                
                {room?.roomTitle}
            <div>
              {room && 
              <CopyToClipboard text={room.roomId}>
                <Button style={{ justifyContent: 'right' }} variant="outlined" color="primary" size="small" style={{ marginRight: '3px' }}>
                    invite<Share />
                </Button>
            </CopyToClipboard>}
            {room &&
              <Button size="small" color="primary" variant="contained" onClick={handleJoin} className={classes.joinBtn}>
                    join
                </Button>}
            </div>
            </Grid>
            
            <Grid container item className={classes.msgList} direction="row">
                <Grid item container direction="column-reverse">
                    {
                    
                    messages.map((message,key)=>{
                            return <LocalMessage message={message} key={key}/>
                    })
                }
                </Grid>
            </Grid>
            
            {room && 
            <Grid container item className={classes.chatInput} justify="center">    
                <TextField variant="outlined" size="small" style={{ width: '85%' }} placeholder="message" onKeyDown={handleKeyPress}  value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <Button onClick={handleSend}  disabled={!message} variant="outlined" color="primary" size="small">
                     Send
                </Button>
               
            </Grid>
            }
            
        </Grid>
    );
};

export default RoomChatCard;
