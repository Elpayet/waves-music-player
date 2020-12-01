import React, {useState, useRef}             from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlay, faStepBackward, faStepForward, faPause}          from '@fortawesome/free-solid-svg-icons'
import styles      from './player.module.css'

const Player = ({ currentSong, skipTrackHandler, isPlaying, setPlaying }) => {

  const [songInfo, setSongInfo] = useState({
    elapsedTime: 0,
    duration: 0,
    animationPercentage: 0
  })

  const audioRef = useRef(null)

  const durationUpdateHandler = e => {
    setSongInfo({...songInfo, duration: Math.floor(e.target.duration)})
  }

  const timeUpdateHandler = e => {
    setSongInfo({
      duration: Math.floor(e.target.duration),
      elapsedTime: Math.floor(e.target.currentTime)
    })
  }

  const playPauseSongHandler = () => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setPlaying(!isPlaying);
  }

  const dragHandler = e => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({
      ...songInfo,
      elapsedTime: e.target.value
    })
  }

  const autoPlayHandler = e => {
    setSongInfo({...songInfo, duration: Math.floor(e.target.duration)})
    if (isPlaying) {
      audioRef.current.play();
    }
  }

  const formatTime = duration => {
    return `${Math.floor(duration/60)}:${Math.floor(duration%60).toString().padStart(2, "0")}`
  }

  const trackAnimStyles = {
    width : `${100 - (100*songInfo.elapsedTime/songInfo.duration)}%`
  }

  const thumbAnimStyles = {
    left : `${97*songInfo.elapsedTime/songInfo.duration}%`,
    backgroundColor: currentSong.color[0]
  }

  return (
    <div className={`${styles.player} relative block`}>
      <div className={styles.time_control}>
        <p style={{minWidth: '70px'}}>{songInfo ? formatTime(songInfo.elapsedTime) : "0:00"}</p>
        <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className={styles.track}>
          <input type="range" min={0} max={Math.floor(songInfo.duration || 0)} value={songInfo.elapsedTime || 0} onChange={dragHandler}/>
          <div style={trackAnimStyles} className={styles.animateTrack} />
          <div style={thumbAnimStyles} className={styles.thumbTrack} />
        </div>
        <p style={{minWidth: '70px'}}>{songInfo && songInfo.duration ? formatTime(songInfo.duration - songInfo.elapsedTime) : "0:00"}</p>
      </div>
      <div className={styles.play_control}>
        <FontAwesomeIcon onClick={() => {skipTrackHandler(-1)}} className="back" icon={faStepBackward} />
        <FontAwesomeIcon onClick={playPauseSongHandler} className="play" icon={isPlaying ? faPause : faPlay} />
        <FontAwesomeIcon onClick={() => {skipTrackHandler(1)}} className="next" icon={faStepForward} />
      </div>
      <audio preload="metadata" onEnded={() => {skipTrackHandler(1)}} onLoadedData={autoPlayHandler} onLoadedMetadata={durationUpdateHandler} onDurationChange={durationUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio} />
    </div>
  )

}

export default  Player;
