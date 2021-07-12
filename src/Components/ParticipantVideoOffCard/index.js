//participant card to show when video of the participant is muted.

import React,{useState} from 'react'
import {Grid,Avatar,makeStyles, Typography} from '@material-ui/core'
import Measure from 'react-measure';

import { useCardRatio } from '../../Hooks/useCardRatio';
import {useOffsets} from '../../Hooks/useOffset';

const ParticipantVideoCard = (props) => {
    const [ container, setContainer ] = useState({ height: 0 });
    const [ aspectRatio ] = useCardRatio(16/9);
    const classes = useStyles();
    const offsets = useOffsets(
    container.width,
    container.height
  );
  // console.log(props.track);
    function handleResize (contentRect) {
        setContainer({
            height: Math.round(contentRect.bounds.width / aspectRatio),
            width: contentRect.bounds.width
        });
    }
    return (
        <Measure bounds onResize={handleResize}>
            {({ measureRef }) => (
               <Grid container item direction="cloumn" className={classes.container} style={{height:`${container.height}px`}}  ref={measureRef} justify="center" alignItems="center">
                   <Avatar src={props.user?.photoURL} style={{height:`3.5rem`, width:`3.5rem`}}/>
                   <Grid item comtainer justify="flex-end" alignItems="flex-end">
                         <Typography className={classes.username}>{props.user?.displayName}</Typography>
                   </Grid>
                  
               </Grid>)
            }
        </Measure>
            
        
    )
}

const useStyles = makeStyles({
    container: {
        width:'100%',
        boxShadow:'4px 0 8px 0 #111'
    },
    username:{
        color:'#fff',
    }
})

export default ParticipantVideoCard
