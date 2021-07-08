import React,{useState,useContext,useEffect} from 'react';
import { TextField, Grid, makeStyles, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';
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
        border: '2px solid #3f51b5',
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
    
    

    const handleSend=()=>{
        addMessage(room?.roomId,{sentAt:new Date().toISOString(),message,sentBy:state.user});
        setMessage('');
    }
    return (
        <Grid container item style={{ height: '100%', width: '100%',backgroundColor: '#8f94fb' }} direction="column">
            <Grid container item className={classes.chatContainer} justify="space-between">
                {room?.roomTitle}
                
              {room &&  <Button size="small" color="primary" variant="contained" className={classes.joinBtn}>
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

            <Grid container item className={classes.chatInput} justify="center">
                <TextField style={{ width: '85%' }} placeholder="message" value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <Button onClick={handleSend}  disabled={!message} color="primary">
                     Send
                </Button>
               
            </Grid>
        </Grid>
    );
};

export default RoomChatCard;
