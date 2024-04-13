'use client'
import React,{useState ,useContext} from 'react'
import configuration from './configuration.json'
import Input from '@/components/Input';
import Select from '@/components/Select';
import Textarea from '@/components/TextArea';

import { fnFieldValidation ,fnFormValidation ,fnReset} from '@/validations/appValidations'
import { Ajax } from '@/services/ajax';
import Link from 'next/link';
import { appCtx } from '@/contexts/appContext';
import {toast} from 'react-toastify';
const Register = () => {
  const [inputArr,setInputArr] = useState(configuration);
  const ctxData = useContext(appCtx)
  const [dataObj,setDataObj] = useState(null)
   
  const fnChange = (eve) =>{

   const updateInputControls =  fnFieldValidation(eve,inputArr)
   setInputArr(updateInputControls)
    
  }

const fnRegister = ()=>{
 const [isFormValid,dataObj,updateInputControls]= fnFormValidation(inputArr)
 if(isFormValid){
  setInputArr(updateInputControls)
  return;
 }
 ctxData.dispatch({ type:"LOADER", payload:true})

 Ajax.fnSendPostReq("http://localhost:2020/users/save-user",{data:dataObj})
 .then((res)=>{
  console.log(res)
  const {acknowledged , insertedId,} = res.data ;
 if(acknowledged && insertedId){
setInputArr(fnReset(inputArr))
toast.success("Successfully Registered")

 }else{
  toast.error("Not Registered , try again")
 }
  })
 .catch((res)=>{
  
  console.error("Registered" ,res)
toast.error("something went wrong")
})
 .finally(()=>{
  ctxData.dispatch({ type:"LOADER", payload:false})
 })

}

  return (
    <div>
      <h3 className='bg-light  my-2 text-center py-3'>Register</h3>
{
  inputArr.map((obj,ind)=>{
    switch(obj.tag){
      case 'select':
        return <Select key={`select_${ind}`} {...obj} fnChange={fnChange}/>
        
        case 'textarea' :
          return <Textarea key={`input_${ind}`} {...obj} fnChange={fnChange}/>
          default:
            return <Input key={`input_${ind}`} {...obj} fnChange={fnChange}/>
    }

  })
}
<div className='row'>
<div className='offset-sm-5 col-sm-7'>
  <button className='btn btn-primary me-5' onClick = {fnRegister}>Register</button>
  <Link href = "/login">To Login</Link>
</div>
</div>
    </div>
  )
}

export default Register