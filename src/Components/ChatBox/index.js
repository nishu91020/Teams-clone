// chat component of the videoScreen.

import React,{useEffect,useState,useContext} from 'react';
import './styles.css';
import {UserContext} from '../../Context/AuthContext';
import { Send, Close } from '@material-ui/icons';
import { TextField, makeStyles, Grid, Button } from '@material-ui/core';
import {addMessage,getMessage} from '../../db';
import Message from '../Message';

const useStyles = makeStyles({
    input:{
        width: '75%',
    },
    box: {
        paddingLeft: '1%',
        backgroundColor: '#ffffff',
        overflowY: 'hidden'
    },
    chatList:{
        paddingLeft: '2px',
        overflowX: 'hidden',
        overflowY: 'auto',
        height: '70vh',
        width: '90%'
    },
    in:{
        height:'5%'
    }
});
const ChatBox = ({handleChat,room}) => {
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    const {state: authState}=useContext(UserContext);
    const classes = useStyles();
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
    const handleSend=()=>{
        addMessage(room?.roomId,{sentAt:new Date().toISOString(),message,sentBy:authState.user});
        setMessage('');
    }
    const handleKeyPress=(e)=>{
        if(e.keyCode ===13)
            handleSend();
    }
    return (
        <Grid container item sm={12} className={classes.box}>
            <Grid item container direction="row" justify="space-between">
                <h3>Meeting Chat</h3>
                <Button size="small" disableRipple disableFocusRipple variant="text" className="cross" onClick={handleChat}>
                    <Close />
                </Button>
            </Grid>

            <Grid container item className={classes.chatList}   direction="row">
                <Grid container item direction="column-reverse">
                {
                    messages.map((message,key)=>{
                            return <Message message={message} key={key}/>
                    })
                }
                </Grid>
            </Grid>
            
            <Grid item container className={classes.in}>
                
                     <TextField className={classes.input} size="small" id="standard-basic" onKeyDown={handleKeyPress} variant="outlined" type="text" placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)} />
        

                    <Button onClick={handleSend} size="small">
                        <Send/>
                </Button>
               
            </Grid>
        </Grid>
    );
};

export default ChatBox;
