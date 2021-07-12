import React, { memo } from 'react'
import './card.css'

export default memo(function AnimateCard({
  url,
  image_url,
  title
}) {
  return (
    <div className="anima-card" title={title}>
      <a href={url} target="_blank">
        <img src={image_url} alt={title} />
        <h3>{title}</h3>
      </a>
    </div>
  );
})