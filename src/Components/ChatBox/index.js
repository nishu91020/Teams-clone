import React,{useEffect,useState,useContext} from 'react';
import './styles.css';
import {UserContext} from '../../Context/AuthContext';
import { Send, Close } from '@material-ui/icons';
import { TextField, makeStyles, Grid, Button } from '@material-ui/core';
import {addMessage,getMessage} from '../../db';
import Message from '../Message';

const useStyles = makeStyles({
    input: {
        width: '230px'
    },
    box: {
        paddingLeft: '1%',
        backgroundColor: '#ffffff'
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
    console.log(room);
    // console.log('helooooo');
    return (
        <Grid sm={12} className={classes.box}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h3>Meeting Chat</h3>
                <Button size="small" disableRipple disableFocusRipple variant="text" className="cross" onClick={handleChat}>
                    <Close />
                </Button>
            </div>
            <div>
            <Grid container item className={classes.msgList} direction="column-reverse">
                {
                    messages.map((message,key)=>{
                            return <Message message={message} key={key}/>
                    })
                }
                
            </Grid>
            </div>
            <Grid direction="row" >
                <TextField className={classes.input} size="small" id="standard-basic" onKeyDown={handleKeyPress} variant="standard" type="text" placeholder="Message" value={message} onChange={(e)=>setMessage(e.target.value)} />
                <Button onClick={handleSend}>
                        <Send />
                </Button>
                
            </Grid>
        </Grid>
    );
};

export default ChatBox;
