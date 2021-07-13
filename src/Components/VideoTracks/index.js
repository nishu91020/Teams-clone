//handle media of participants in room.

import React, { useEffect,useState, useRef } from 'react';
import Measure from 'react-measure';
import {makeStyles} from '@material-ui/core'
import { useCardRatio } from '../../Hooks/useCardRatio';
import {useOffsets} from '../../Hooks/useOffset';
import ParticipantVideoOffCard from '../ParticipantVideoOffCard';

const VideoTrack = props => {
    const videoRef = useRef();
    const audioRef = useRef();
    const classes = useStyles();
    const [ container, setContainer ] = useState({ height: 0 });
    const [aspectRatio, calculateRatio ] = useCardRatio(1.7778);
    const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
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

    function handleCanPlay () {
        calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
        videoRef.current.play();
    }
    useEffect(
        () => {
            if (props.track) {
                props.track[0]?.attach(audioRef.current);
                props.track[1]?.attach(videoRef.current);
            }
            return()=>{
              if(props.track) {
                  props.track[0]?.detach();
                  props.track[1]?.detach();
              }
            }
        },
        [ props.track ]
    );
    // console.log(props.track);
    console.log("height", container.height);
    return (
       <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        
        <div  ref={measureRef} className={classes.root} style={{height:`${container.height}px`}}>
         { (props.isVideoEnabled)?(
          <video 
            ref={videoRef}
            onCanPlay={handleCanPlay}
            autoPlay 
            playsInline 
            muted
            className={classes.video}
          />):(
            <ParticipantVideoOffCard user={props.user} isAudioEnabled={props.isAudioEnabled}/>
          )
        }
          <audio ref={audioRef}/>
        </div>
      )}
    </Measure>
    );
};

//nhi remote waali video badi ho gyi thi size mein aisa kyu hua dekh rha hu

const useStyles = makeStyles({
  root :{
    display:'flex',
    justifyContent : 'center',
    alignItems : 'center',
    width:'90%'
  },
  video:{
    flex:1,
    height:'90%'
  }
})

export default VideoTrack;
