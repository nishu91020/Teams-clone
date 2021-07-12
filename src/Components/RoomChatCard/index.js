//component of chatScreen to show the list of chats for the room selected.

import React,{useState,useContext,useEffect} from 'react';
import { TextField, Grid, makeStyles, Button,Typography } from '@material-ui/core';
import history from '../../history';
import {UserContext} from '../../Context/AuthContext';
import { Share } from '@material-ui/icons';
import LocalMessage from '../LocalMessage';
import {addMessage,getMessage,deleteParticipantFromRoom,deleteRoomFromParticipant} from '../../db';
import CopyToClipboard from 'react-copy-to-clipboard';
import './styles.css';
import img from '../../images/roomChatCardImage.jpg'

const useStyles = makeStyles({
    chatContainer: {
        backgroundColor: '#f8f4ff',
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
    },
    alt:{
        fontSize: '220%',
        fontFamily: 'cursive',
        fontStyle: 'italic',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
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
    const handleLeave=()=>{
        deleteRoomFromParticipant(room.roomId,authState.user.uid);
        deleteParticipantFromRoom(room.roomId,authState.user.uid);
    }
    
    return (
        <Grid container item style={{ height: '100%', width: '100%',backgroundColor: '#FEFFFF',overflowX:'hidden' }} direction="column">
            <Grid container item className={classes.chatContainer} justify="space-between">
                
                {room?.roomTitle}
            <div>
              {room && 
              <CopyToClipboard text={room.roomId}>
                <Button style={{ justifyContent: 'right',marginRight: '3px' }} variant="outlined" color="primary" size="small" >
                    invite<Share />
                </Button>
            </CopyToClipboard>}
            {room &&
                <React.Fragment>
                    <Button style={{ justifyContent: 'right',marginRight: '3px' }} size="small" color="primary" variant="contained" onClick={handleLeave}>Leave</Button>
                    <Button size="small" color="primary" variant="contained" onClick={handleJoin} className={classes.joinBtn}>
                        join
                    </Button>
                </React.Fragment>
               
                }
            </div>
            </Grid>
            {
                !room && (<div><Typography className={classes.alt}>Hey start chatting with your friends here!</Typography>
                            <div style={{alignItems:'center',justifyContent:'center',textAlign:'center'}}>
                                <img src={img} alt="friend" width="70%" />
                            </div>
                            </div>)
            }
            
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
