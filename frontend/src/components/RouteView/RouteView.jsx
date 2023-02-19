import cl from './RouteView.module.css'
import icon from '../../images/icon.png'
import { useContext } from 'react'
import { MapContext } from '../../context/MapContext'
import { useWindowDimensions } from '../../hooks'

export const RouteView = () => {
  const { curRoute } = useContext(MapContext)
  const [width] = useWindowDimensions()
  const points = curRoute.points

  if (!points?.length) return null;
  if (width < 900) return null;

  return <ul className={cl.view}>
    {points?.slice(Math.max(points.length - 10, 0), Math.min(10, points.length)).map((point) => {
      return <li className={cl.mark} key={point.code}>
        <img draggable={false} alt={`map icon of ${point.title}`} src={icon} className={cl.mark__icon}/>
        <p className={cl.mark__description}>{point.title}</p>
      </li>
    })
    }
  </ul>
}
