import { useEffect } from 'react'

/**
 * 
 * @param {String} title 
 * @param {Array} deps
 */
export const useDocumentTitle = function (title,deps) {
  useEffect(() => {
    document.title = title
  },[...deps])
}