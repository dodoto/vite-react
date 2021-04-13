import React, { useState, useRef, useEffect } from 'react'
import './style.css'
import ControlBar from './component/ControlBar'

const imgUrl = 'https://pic2.zhimg.com/v2-965a81075317d91f55cda3652859f3bb_r.jpg?source=1940ef5c'

const musicUrl = [
  
]

const data = [
  {
    imgUrl: 'http://bl.talelin.com/images/music.1.png',
    musicUrl: 'http://music.163.com/song/media/outer/url?id=317245.mp3',
    title: '杨千嬅 -- xxxxx'
  },
  {
    imgUrl: 'http://bl.talelin.com/images/music.5.png',
    musicUrl: 'http://music.163.com/song/media/outer/url?id=26427662.mp3',
    title: '好妹妹 -- 一个人的北京'
  },
  {
    imgUrl: 'http://bl.talelin.com/images/music.7.png',
    musicUrl: 'http://music.163.com/song/media/outer/url?id=393926.mp3',
    title: '纯音乐 -- 风之谷'
  }
]

export default function Player() {

  const player = useRef()

  const [isPlay,setIsPlay] = useState(false)

  const [songIndex,setSongIndex] = useState(0)

  const stop = _ => {
    setIsPlay(false)
  }

  const resume = _ => {
    setIsPlay(true)
  }

  const next = _ => {
    if(songIndex === data.length - 1) {
      setSongIndex(0)
    }else{
      setSongIndex(songIndex + 1)
    }
    setIsPlay(true)
  }

  const prev = _ => {
    if(songIndex === 0) {
      setSongIndex(data.length - 1)
    }else{
      setSongIndex(songIndex - 1)
    }
    setIsPlay(true)
  }

  const song = data[songIndex]

  const musicUrl = song['musicUrl']

  const imgUrl = song['imgUrl']

  const title = song['title']

  useEffect(_ => document.title = title,[songIndex])

  return (
    <div className="player-container">
      <div className="background" style={{backgroundImage:`url(${imgUrl})`}}></div>
      <div 
        className="cover" 
        style={{animationPlayState: isPlay ? 'running' : 'paused'}}
      >
        <img src={imgUrl}/>
      </div>
      <audio 
        autoPlay={isPlay}
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
        next={next}
        prev={prev}
      />
    </div>
  );
}