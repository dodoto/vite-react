import React, { useEffect } from 'react'

export default function Progress({player}) {

  useEffect(()=>{
    let audio = player.current
    let timer = setInterval(_=>{
      console.log("Start: " + audio.buffered.start(0)
      + " End: " + audio.buffered.end(0))
      if(audio.duration == audio.currentTime) {
        clearInterval(timer)
      }
    },1000)

    
  },[])

  return (
    <div></div>
  );
}