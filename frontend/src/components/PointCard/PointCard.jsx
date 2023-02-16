import React from 'react'
import cl from './PointCard.module.css'
import cn from 'classnames'

const PointCard = ({ title, category, onClick, chosen = false }) => {
  return <button className={cn(cl.card, { [cl.card_chosen]: chosen })} onClick={e => onClick(e)}>
    <h4 className={cl.card__title}>
      {title}
      <span className={cl.card__category}>
        {category}
      </span></h4>
  </button>
}

export default PointCard
