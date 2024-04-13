'use client'
import { Ajax } from '@/services/ajax'
import React, { useContext, useEffect, useState } from 'react'
import { appCtx } from '@/contexts/appContext'
import Table from '@/components/Table/Table'

const Users = () => {
  const [userPro,setUserPro] = useState([])
  const ctxData = useContext(appCtx)
  useEffect(()=>{
    
  fnGetUsers()
  },[])

  const fnGetUsers=async()=>{
ctxData.dispatch({type:"LOADER",payload:true})
    try{
 const res =   await Ajax.fnSendGetReq("http://localhost:2020/users/get-user")

 setUserPro(res.data)
    }
    catch(ex){
      console.error("profile_",ex)
    }
    finally{
      ctxData.dispatch({type:"LOADER",payload:false})
    }
  }
  return (
    <div>
      <h3 className='text-center'>Users</h3>
      <Table
       headers={["FULLNAME","UNAME","GENDER","HOBBIES","COUNTRY","ADDRESS"]}
      data = {userPro} 
      columns = {["fullname","Uname","gender","hobbies","country","address"]}/>
    </div>
  )
}

export default Users;