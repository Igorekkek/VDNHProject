import React from 'react'
import { useHistory } from '../../hooks'
import cl from './HistoryList.module.css'

const HistoryList = () => {
  const { isLoading, error, data } = useHistory()

  if (isLoading) return <ul className={cl.routes}></ul>
  if (error) return <div>Error occurred</div>

  return (
    <ul className={cl.routes}>
      {data?.post?.length && data.post.map(route => {
        return <ol className={cl.route} style={{backgroundColor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`}}>
          {route.map((point) => <li className={cl.route__item}><h4>{point.title}</h4>  </li>)}
          </ol>
      })}
    </ul>
  )
}

export default HistoryList
