import React, { useState, useRef } from 'react'
import './style.css'
import Progress  from './component/Progress'
import ControlBar from './component/ControlBar'

const imgUrl = 'https://pic2.zhimg.com/v2-965a81075317d91f55cda3652859f3bb_r.jpg?source=1940ef5c'

const musicUrl = 'https://m10.music.126.net/20210411224018/61753ed278d11a29f95a18ff84035a83/ymusic/5d03/d39b/e0dc/841583a37950c7b1314f258e123aa54f.mp3'

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

  const ended = () => {
    setIsPlay(false)
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
        onEnded={ended}
      >
        浏览器不支持音频播放
      </audio>
      <Progress player={player}/>
      <ControlBar 
        isPlay={isPlay}
        stop={stop}
        resume={resume}
      />
    </div>
  );
}