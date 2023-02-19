import React from 'react'
import cl from './PointCard.module.css'
import cn from 'classnames'

const PointCard = ({ title, category, onClick = null, onHover = null, chosen = false, disabled = false }) => {
  let timeout
  return <button className={cn(cl.card, { [cl.card_chosen]: chosen, [cl.card_disabled]: disabled })}
                 onClick={e => {
                   if (timeout) clearTimeout(timeout)
                   onClick && onClick(e)
                 }}
                 onMouseEnter={e => {
                   if (!onHover) return
                   timeout = setTimeout(() => onHover(e), 1000)
                 }}
                 onMouseLeave={() => {
                   if (timeout) {
                     clearTimeout(timeout)
                   }
                 }}>
    <h4 className={cl.card__title}>
      {title}
      <span className={cl.card__category}>
                 {disabled ? `Начальная точка` : category}
                   </span>
    </h4>
  </button>
}

export default PointCard
