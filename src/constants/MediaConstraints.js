const MeadiaConstraints = {
    audio: {
        echoCancellation: true,
        noiseSuppression: true
    },
    video: {
        resizeMode: 'crop-and-scale',
        aspectRatio: { ideal: 1.77778 },
        facingMode: 'environment'
    }
};
export default MeadiaConstraints;
