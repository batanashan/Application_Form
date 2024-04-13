'use client'
import React, { useContext, useEffect, useState } from 'react'
import configuration from './configuration.json'
import Input from '@/components/Input'
import Textarea from '@/components/TextArea'

import { fnFieldValidation ,fnFormValidation ,fnReset} from '@/validations/appValidations'
import { Ajax } from '@/services/ajax';
import { appCtx } from '@/contexts/appContext'
import { toast } from 'react-toastify'
import { Modal } from '@/components/Modal'
const Profile = () => {
const [inputArr,setInputArr] = useState(configuration);
const [isShowModal,setIsShowModal] = useState(false)

const ctxData = useContext(appCtx)
useEffect(()=>{
  fnSetFormData()
},[])
 
const fnSetFormData = ()=>{

  try{
    const clonedInputControls = JSON.parse(JSON.stringify(configuration))
    const userInfo =   JSON.parse(sessionStorage.userInfo)
  
    clonedInputControls.forEach((obj)=>{
     obj.value = userInfo[obj.name]


  })
  setInputArr(clonedInputControls)
}
catch(ex){
  console.log("error in profile_",ex)

}finally{
 
}
}
const fnChange = (eve) =>{

  const updateInputControls =  fnFieldValidation(eve,inputArr)
  setInputArr(updateInputControls)
   
 }

const fnUpdate = ()=>{
const [isFormValid,dataObj,updateInputControls]= fnFormValidation(inputArr)
if(isFormValid){
 setInputArr(updateInputControls)
 return;
}

ctxData.dispatch({type:"LOADER",payload : true})

Ajax.fnSendPutReq(`http://localhost:2020/users/update-user?id=${ctxData?.state?.user?._id}`,{data:dataObj})
.then((res)=>{
const {acknowledged,modifiedCount} = res.data;
if(acknowledged && modifiedCount){
  const userInfo =   JSON.parse(sessionStorage.userInfo)
  sessionStorage.userInfo = JSON.stringify({...userInfo,...dataObj})
  ctxData.dispatch({type:"LOGIN",isLoggedIn:true,user:{...userInfo,...dataObj}})
  toast.success("sucessfully Updated")
}else{
  toast.error("Not updated try again")
}

 })
.catch((res)=>{
 toast.error("something went wrong")
 console.error("updated" ,res)

})
.finally(()=>{
 ctxData.dispatch({type:"LOADER",payload : false})   

})

}
const fnTerminate = () =>{
setIsShowModal(true)
}
const fnOk = async()=>{
  try{
  setIsShowModal(false)
  ctxData.dispatch({type:"LOADER",payload : true})
  const res =await Ajax.fnSendDeleteReq(`http://localhost:2020/users/delete-user/${ctxData?.state?.user?._id}`)
  const {acknowledged, deletedCount} = res.data
  if(acknowledged && deletedCount){
    toast.success("successfully Terminated")
    setInputArr(fnReset(inputArr))
  
  }else{

  
    toast.error("Not Terminated try again ")
  }



 
  }catch(ex){
    toast.error("something went wrong,Please check console")
    console.error("profile_",ex)

  }finally{
    ctxData.dispatch({type:"LOADER",payload : false})
  }
}
const fnClose = () =>{
setIsShowModal(false)

}

  return  <div>
    <h3 className='text-center my-4'>UserInformation</h3>
    {
    inputArr.map((obj,ind)=>{
      switch(obj.tag){
        case 'textarea':
          return <Textarea key={`textarea_${ind}`} {...obj} fnChange={fnChange}/>
          default:
            return <Input key={`input_${ind}`} {...obj} fnChange={fnChange}/>

        }

    })
    
    }
    <div className='row'>
      <div className='offset-sm-5 col-sm-7'><button className='btn btn-primary' onClick ={fnUpdate}>Update</button>
      <button className='btn btn-primary ms-5' onClick = {fnTerminate}>Delete</button>
      </div>
    </div>
   { isShowModal && <Modal text={"R u sure ............"} isShowOk={true} fnOk={fnOk} fnClose={fnClose}/>}
  </div>
  
}

export default Profile;