import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function toMinuteAndSecond(time) {
  if(time <= 1) {
    return '00:00'
  }
  let minute = parseInt(time / 60) + ''
  let second = parseInt(time % 60) + ''
  minute.length < 2 && (minute = 0 + minute)
  second.length < 2 && (second = 0 + second)
  return  minute + ':' + second 
}

export default function Progress({playerRef,isPlay}) {

  const [playState,setPlayState] = useState({currentTime:0,buffered:0,duration:1})

  const { currentTime, buffered, duration } = playState

  const progressBar = useRef()

  const progress = currentTime / duration * 100

  const bufferedProgress = buffered / duration * 100

  const total = toMinuteAndSecond(duration)

  const current = toMinuteAndSecond(currentTime)

  const [isSliding,setIsSliding] = useState(false)

  const setProgress = currentTime => {
    playerRef.current.currentTime = currentTime
    setPlayState({currentTime,buffered:0,duration})
  }
  //点击改变进度条
  const clickSetProgress = e => {
    const { left, width } = progressBar.current.getBoundingClientRect()
    const { clientX } = e
    let currentTime = duration * (Math.abs(left-clientX)/width)
    setProgress(currentTime)
  }

  //获取滑动和触摸开始时的一些要素
  const getBeginEl = e => {
    let parentEl = e.target.parentNode
    let width = parentEl.clientWidth
    let { width: maxWidth } = progressBar.current.getBoundingClientRect()
    let styleWidth = 0
    return { 
      parentEl,     //进度条dom节点     
      width,        //当前进度
      maxWidth,     //最大进度
      styleWidth    //修改后的进度
    }
  }
  //手指或鼠标移动时的处理函数
  const moveHnadler = (beginX,endX,originWidth,styleWidth,maxWidth,parentEl) => {
    let moveX = endX - beginX
    styleWidth = originWidth + moveX
    if(styleWidth < 0) styleWidth = 0
    if(styleWidth > maxWidth) styleWidth = maxWidth
    parentEl.style.width = `${styleWidth}px`
    let currentTime = duration * (styleWidth/maxWidth)
    setProgress(currentTime)
  }
  //滑动改变进度条
  const slideSetProgress = e => {
    e.preventDefault()
    setIsSliding(true)
    /**onmousedown + onmouseup = click 冒泡触发父元素的 setProgress */
    let { parentEl, width, maxWidth, styleWidth } = getBeginEl(e)
    let { clientX: beginX } = e
    document.onmousemove = e => {
      let { clientX } = e
      moveHnadler(beginX,clientX,width,styleWidth,maxWidth,parentEl)
    }
    document.onmouseup = _ => {
      document.onmousemove = null
      document.onmouseup = null
      setIsSliding(false)
    }
  }
  //移动端触摸改变进度
  const touchSetProgress = e => {
    setIsSliding(true)
    let el = e.target
    let { parentEl, width, maxWidth, styleWidth } = getBeginEl(e)
    let { clientX: beginX } = e.touches[0]
    el.ontouchmove = e => {
      let { clientX } = e.touches[0]
      moveHnadler(beginX,clientX,width,styleWidth,maxWidth,parentEl)
    }
    el.ontouchend = _ => {
      el.ontouchmove = null
      el.ontouchend = null
      setIsSliding(false)
    }
  }

  const stopClick = e => e.stopPropagation()

  useEffect(_=>{
    let timer = null
    if(isPlay && !isSliding) {
      let player = playerRef.current
      timer = setInterval(_ => {
        let { currentTime, buffered, duration } = player
        let length = buffered.length - 1
        buffered = buffered.end(length)
        setPlayState({currentTime,buffered,duration})
      },700)
    }
    return _ => {
      if(timer) {
        clearInterval(timer)
        timer = null
      }
    }
  },[isPlay,isSliding])

  return (
    <>
      <div className="progress-bar" onClick={clickSetProgress} ref={progressBar}>
        <div className="loaded-progress" style={{width:`${bufferedProgress}%`}}></div>
        <div className="progress" style={{width:`${progress}%`}}>
          <div className="progress-thumb" 
            onTouchStart={touchSetProgress}
            onMouseDown={slideSetProgress}
            onClick={stopClick}
          />
        </div>
      </div>
      <div className="progress-time">
        <span>{current}</span>
        <span>{total}</span>
      </div>
    </>
  );
}

Progress.propTypes = {
  playerRef: PropTypes.object,
  isPlay: PropTypes.bool
}