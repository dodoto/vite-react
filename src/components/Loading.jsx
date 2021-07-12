import React, { memo } from 'react' 
import Modal from './Modal'
import './Loading.css'
export default memo(function Loading() {
  return (
    <Modal>
      <div className="spinner"></div>
    </Modal>
  );
})