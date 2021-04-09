import React from 'react'
import PropTypes from 'prop-types'

export default function ControlBar({isPlay,stop,resume}) {

  const setPlayStatus = () => {
    if(isPlay) {
      stop()
    }else{
      resume()
    }
  }

  return (
    <div className="controlBarContainer">
      <div className="player-buttons">
        <div className="player-button">
          <i className="fa fa-step-backward"></i>
        </div>
        <div className="player-button" onClick={setPlayStatus}>
          {
            isPlay ?
            <i className="fa fa-pause-circle"></i>:
            <i className="fa fa-play-circle"></i> 
          }
        </div>
        <div className="player-button">
          <i className="fa fa-step-forward"></i>
        </div>
      </div>
    </div>
  );
}

ControlBar.propTypes = {
  isPlay: PropTypes.bool,
  stop: PropTypes.func,
  resume: PropTypes.func
}