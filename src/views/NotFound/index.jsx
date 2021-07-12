import React from 'react'
import { useDocumentTitle } from '../../hooks'
import './index.css'

export default function NotFound({title}) {

  useDocumentTitle(title,[])

  return (
    <div className="not-found"></div>
  )
}