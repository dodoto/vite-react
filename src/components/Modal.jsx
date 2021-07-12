import React, { memo, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'

export default memo(function Modal({children}) {

  const container = document.createElement('div')

  useEffect(() => {
    container.classList.add('jikan-modal')
    document.body.appendChild(container)
    return  () => document.body.removeChild(container)
  },[])

  return (
    ReactDOM.createPortal(children,container)
  );
})