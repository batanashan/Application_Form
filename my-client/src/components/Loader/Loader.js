import React from 'react'
import styles from './Loader.module.css'
export const Loader = () => {
  return (
    <div>
        <div className={styles.mask}></div>
        <img  src= "loading.gif"  alt="loading....."/>
    </div>
  )
}
