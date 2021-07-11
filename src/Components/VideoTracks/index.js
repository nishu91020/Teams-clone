import React, { useEffect,useState, useRef } from 'react';
import Measure from 'react-measure';

import { useCardRatio } from '../../Hooks/useCardRatio';
import {useOffsets} from '../../Hooks/useOffset';

const VideoTrack = props => {
    const videoRef = useRef();
    const audioRef = useRef();
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
                props.track[0]?.attach(audioRef.current);
                props.track[1]?.attach(videoRef.current);
            }
        },
        [ props.track ]
    );
    // console.log(props.track);
    return (
       <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <div  ref={measureRef} style={{ maxWidth:'90%'}}>
          <video 
            ref={videoRef}
            onCanPlay={handleCanPlay}
            style={{top: `-${offsets.y}px`, left: `-${offsets.x}px` ,height:'10%',borderRadius:'5px'}}
            autoPlay 
            playsInline 
            muted
          />
          <audio ref={audioRef}/>
        </div>
      )}
    </Measure>
    );
};

export default VideoTrack;
