
'use client'

import React, { useState ,useEffect} from 'react'
import styles from './Menu.module.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import menuItems from './configuration.json'
const Menu = () => {
  const pathname = usePathname()
    const [isShowMenu,setIsShowMenu]=useState()
    const [left,setLeft]=useState(-150)
    const [menuItem,setMenuItem ] =useState('')

     useEffect(()=>{
      setMenuItem(pathname?.slice(1) || 'home')
      setIsShowMenu(document.body.clientWidth>700?false:true)
      window.addEventListener('resize',fnResize)
     },[])
    const fnResize=()=>{
        if(document.body.clientWidth<700){
            setIsShowMenu(true)
        }
        else{
            setIsShowMenu(false)
        }
    }

    const handleMenuBtnClick=()=>{
        setLeft(left===0?-150:0)
    }
    const handleMenuItemClick =(eve,item)=>{
      eve.stopPropagation()
      setMenuItem(item)
      setLeft(-150)
    }
  return <div >
  {isShowMenu && <button className={styles.mobileMenuBtn} onClick={handleMenuBtnClick}>
    <span></span>
    <span></span>
    <span></span> 
  </button>
}
  <ul style={{left}}className={`${isShowMenu? styles.mobileMenu : styles.menu}`}>
  { menuItems.map(({link,item,id},ind)=>{
return <li key = {`li_${ind}`}><Link href={link}  className = {menuItem === id ?styles.menuActive:''} onClick={(eve)=>handleMenuItemClick(eve,id)}>{item}</Link></li>

  })   }</ul>
  </div>

}

export default Menu