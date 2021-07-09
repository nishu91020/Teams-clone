import React,{useState,useContext,useEffect} from 'react';
import { TextField, Grid, makeStyles, Button,Typography } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import history from '../../history';
import {UserContext} from '../../Context/AuthContext';
import Message from '../Message';
import LocalMessage from '../LocalMessage';
import {addMessage,getMessage} from '../../db';
import './styles.css';
const useStyles = makeStyles({
    chatContainer: {
        backgroundColor: '#EFEEEE',
        height: '9%',
        padding: '1%',
        fontSize: '18px',
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
    const {state} =useContext(UserContext);
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
        addMessage(room?.roomId,{sentAt:new Date().toISOString(),message,sentBy:state.user});
        setMessage('');
    }
    const handleKeyPress=(e)=>{
        if(e.keyCode ===13)
            handleSend();
    }
    
    return (
        <Grid container item style={{ height: '100%', width: '100%',backgroundColor: '#8f94fb' }} direction="column">
            <Grid container item className={classes.chatContainer} justify="space-between">
                
                {room?.roomTitle}
                
              {room &&  <Button size="small" color="primary" variant="contained" onClick={handleJoin} className={classes.joinBtn}>
                    join
                </Button>}
            </Grid>
            
            <Grid container item className={classes.msgList} direction="column-reverse">
                {
                    messages.map((message,key)=>{
                            return <LocalMessage message={message} key={key}/>
                    })
                }
                
                
            </Grid>
            
            {room && 
            <Grid container item className={classes.chatInput} justify="center">
                <TextField variant="outlined" size="small" style={{ width: '85%' }} placeholder="message" onKeyDown={handleKeyPress} value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <Button onClick={handleSend}  disabled={!message} variant="outlined" color="primary">
                     Send
                </Button>
               
            </Grid>
            }
            
        </Grid>
    );
};

export default RoomChatCard;
