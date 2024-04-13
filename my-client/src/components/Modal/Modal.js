import React from 'react'
import styles from './Modal.module.css'
export const Modal = ({text,isShowOk,fnOk,fnClose}) => {
  return (
    <div>
        <div className={styles.mask}></div>
        <div className={`px-3 py-3 ${styles.modalContainer}`}>
            <h3>{text}</h3>
            <div className='text-end'>
                {
                    isShowOk && 
                <button className='btn btn-primary me-3' onClick = {fnOk}>ok</button>
}
                <button className='btn btn-primary me-3' onClick = {fnClose}>close</button>
            </div>

        </div>

    </div>
  )
}
