import React, { useCallback, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import './index.css'
import { useDocumentTitle } from '../../hooks'
import Card from './component/card'
import Loading from 'components/Loading'

export default function JikanSearch({title}) {

  const SearchRef = useRef(null)

  const [IsSearching,SetIsSearching] = useState(false)

  const [ResList,SetResList] = useState([])

  const HandleSubmit = useCallback(e => {
    e.preventDefault()
    const q = SearchRef.current.value.trim()
    if(q) {
      SetIsSearching(true)
      document.title = q
      fetch(`https://api.jikan.moe/v3/search/anime?q=${q}`)
      .then(res => res.json())
      .then(data => {
        SetResList(data.results)
      })
      .catch(err => {
        console.log(err.message)
      })
      .finally(() => {
        SetIsSearching(false)
      })
    }
    
  },[SearchRef])

  useDocumentTitle(title,[])

  return (
    <React.Fragment>
      <div className="jikan-search-input">
        <form onSubmit={HandleSubmit}>
          <input type="text" ref={SearchRef} spellCheck={false} placeholder="搜索"/>
          <button className="fa fa-search"></button>
        </form>
      </div>
      <div className="jikan-search-res">
        {
          ResList.map(({mal_id,url,title,image_url}) => <Card key={mal_id} url={url} image_url={image_url} title={title}/>)
        }
      </div>
      { IsSearching &&
        <CSSTransition in={IsSearching} timeout={200} appear={true} classNames="my-node">
          <Loading />
        </CSSTransition> 
      }
    </React.Fragment>
  );
}