import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Progress from './Progress'

export default function ControlBar({isPlay,stop,resume,playerRef,next,prev,currentIndex}) {

  const setPlayStatus = _ => {
    if(isPlay) {
      stop()
      playerRef.current.pause()
    }else{
      resume()
      playerRef.current.play()
    }
  }

  useEffect(_ => {
    let player = playerRef.current
    player.addEventListener('ended',_ => {
      next()
    })
  },[stop])

  useEffect(_=>{
    let player = playerRef.current
    player.addEventListener('error',_ => {
      let state = player.networkState
      switch (state) {
        case 0:
          console.log('还没有数据.并且 readyState 的值是 HAVE_NOTHING.')
          break;
        case 1:
          console.log('HTMLMediaElement 是有效的并且已经选择了一个资源,但是还没有使用网络.')
          break;    
        case 3:
          console.log('没有找到 HTMLMediaElement src.')
          break;
        default:
          console.log('浏览器正在下载 HTMLMediaElement 数据.')
          break;  
      }
    })
  },[])
  return (
    <div className="controlBarContainer" >
      <Progress 
        currentIndex={currentIndex}
        isPlay={isPlay}
        playerRef={playerRef}
      />
      <div className="player-buttons">
        <div className="player-button" onClick={prev}>
          <i className="fa fa-step-backward"></i>
        </div>
        <div className="player-button" onClick={setPlayStatus}>
          {
            isPlay ?
            <i className="fa fa-pause-circle"></i>:
            <i className="fa fa-play-circle"></i> 
          }
        </div>
        <div className="player-button" onClick={next}>
          <i className="fa fa-step-forward"></i>
        </div>
      </div>
    </div>
  );
}

ControlBar.propTypes = {
  currentIndex: PropTypes.number,
  playerRef: PropTypes.object,
  isPlay: PropTypes.bool,
  stop: PropTypes.func,
  resume: PropTypes.func,
  next: PropTypes.func,
  prev: PropTypes.func
}