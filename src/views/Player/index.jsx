import React, { useState, useRef } from 'react'
import './style.css'
import ControlBar from './component/ControlBar'

const imgUrl = 'https://pic2.zhimg.com/v2-965a81075317d91f55cda3652859f3bb_r.jpg?source=1940ef5c'

const musicUrl = 'http://music.163.com/song/media/outer/url?id=317245.mp3'

export default function Player() {

  const player = useRef()

  const [isPlay,setIsPlay] = useState(false)

  const stop = () => {
    setIsPlay(false)
  }

  const resume = () => {
    setIsPlay(true)
  }

  return (
    <div className="player-container">
      <div className="background"></div>
      <div 
        className="cover" 
        style={{animationPlayState: isPlay ? 'running' : 'paused'}}
      >
        <img src={imgUrl}/>
      </div>
      <audio 
        ref={player} 
        src={musicUrl}
      >
        浏览器不支持音频播放
      </audio>

      <ControlBar 
        playerRef={player}
        isPlay={isPlay}
        stop={stop}
        resume={resume}
      />
    </div>
  );
}