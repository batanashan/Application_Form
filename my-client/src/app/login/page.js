'use client'
import Input from '@/components/Input'
import React , {useContext, useState} from 'react'
import configuration from './configuration.json'
import { fnFieldValidation ,fnFormValidation, fnReset} from '@/validations/appValidations'
import Link from 'next/link'
import { Ajax } from '@/services/ajax'
import { appCtx } from '@/contexts/appContext'
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation'
import { Cookies } from '@/services/Cookies'
const Login = () => {
  const [inputArr,setInputArr] = useState(configuration)
  const ctxData = useContext(appCtx)
  const router = useRouter()

  const [dataObj,setDataObj] = useState(null)
   
  const fnChange = (eve) =>{

   const updateInputControls =  fnFieldValidation(eve,inputArr)
   setInputArr(updateInputControls)
    
  }

const fnLoginClick =async ()=>{
  try{
 const [isFormValid,dataObj,updateInputControls]= fnFormValidation(inputArr)
 if(isFormValid){
  setInputArr(updateInputControls)
  return;
 }
 ctxData.dispatch({type:"LOADER",payload : true})
 const res =  await Ajax.fnSendPostReq("http://localhost:2020/users/login",{data:dataObj})
 if(res.data?.length){
  sessionStorage.userInfo = JSON.stringify(res.data[0])
 Cookies.setItem("token",res.data[0]?.token)
 ctxData.dispatch({type:"LOGIN",isLoggedIn:true,user:res.data[0]})
 router.push('/home')
 
 }else{
  toast.error("Please check uid or password")
 }
  }catch(ex){
    console.error("res",ex)
toast.error("something  went wrong..")
  }
  finally{
    ctxData.dispatch({type:"LOADER",payload:false})
  }

}



  return <div>
<h3 className='bg-light  my-2 text-center py-3'>Login</h3>
{
  inputArr.map((obj,ind)=>{
return <Input key={`input_${ind}`} {...obj} fnChange={fnChange}/>
  })
}
<div className='row'>
<div className='offset-sm-5 col-sm-7'>
  <button className='btn btn-primary me-5' onClick = {fnLoginClick} >Login</button>
  <Link href ="/register">To Register</Link>
</div>
</div>
  </div>
  
}

export default Login