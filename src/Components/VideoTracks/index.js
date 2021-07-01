import React, { useEffect,useState, useRef } from 'react';
import Measure from 'react-measure';

import { useCardRatio } from '../../Hooks/useCardRatio';
import {useOffsets} from '../../Hooks/useOffset';


const VideoTrack = props => {
    const videoRef = useRef();
    const [ container, setContainer ] = useState({ height: 0 });
    const [ aspectRatio, setAspectRatio ] = useCardRatio(1.3334);
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
        setAspectRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
        videoRef.current.play();
    }
    useEffect(
        () => {
            if (props.track) {
                // props.track[0]?.attach(audioRef.current);
                props.track?.attach(videoRef.current);
            }
        },
        [ props.track ]
    );
    // console.log(props.track);
    return (
       <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <div  ref={measureRef} style={{ height: `${container.height}px`,maxWidth:'90%'}}>
          <video 
            ref={videoRef}
            onCanPlay={handleCanPlay}
            style={{height:'100%',width:'100%', top: `-${offsets.y}px`, left: `-${offsets.x}px`,borderRadius:'10px' }}
            autoPlay 
            playsInline 
            muted
          />
        </div>
      )}
    </Measure>
    );
};

export default VideoTrack;
