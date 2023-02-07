import cl from './RouteView.module.css'
import icon from '../../images/icon.png'
import { useContext } from 'react'
import { MapContext } from '../../context/MapContext'

export const RouteView = () => {
  const { curRefPoints } = useContext(MapContext)
  return <ul className={cl.view}>
    {curRefPoints?.slice(Math.max(curRefPoints.length - 10, 0), Math.min(10, curRefPoints.length)).map((point) => {
      return <li className={cl.mark} key={point.code}>
        <img draggable={false} alt={`map icon of ${point.title}`} src={icon} className={cl.mark__icon}/>
        <p className={cl.mark__description}>{point.title}</p>
      </li>
    })
    }
  </ul>
}
