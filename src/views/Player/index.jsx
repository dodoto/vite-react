import React, { useState, useRef } from 'react'
import './style.css'
import Progress  from './component/Progress'
import ControlBar from './component/ControlBar'

const imgUrl = 'https://pic2.zhimg.com/v2-965a81075317d91f55cda3652859f3bb_r.jpg?source=1940ef5c'

const musicUrl = 'https://m10.music.126.net/20210409173105/e4f50a09828597d80a1d8b02cd95f94b/ymusic/5d03/d39b/e0dc/841583a37950c7b1314f258e123aa54f.mp3'

export default function Player() {

  const player = useRef()

  const [isPlay,setIsPlay] = useState(false)

  const stop = () => {
    setIsPlay(false)
    player.current.pause()
  }

  const resume = () => {
    setIsPlay(true)
    player.current.play()
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
      <audio ref={player} src={musicUrl}>浏览器不支持音频播放</audio>
      <Progress />
      <ControlBar 
        isPlay={isPlay}
        stop={stop}
        resume={resume}
      />
    </div>
  );
}