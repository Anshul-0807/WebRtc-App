import React from 'react'
import styles from './Card.module.css'



export const Card = ({title,icon,children}) => {
  return (
    <div className={styles.Card}>
    <div className={styles.headingWrapper}>

    <img src={`/imags/${icon}.png`} alt="logo" />
    <h1 className={styles.heading}>{title}</h1>
    </div>
   {children}
   
</div>
  )
}
export default Card;