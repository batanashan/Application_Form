import React, { Fragment } from 'react'

const Input = (props) => {
    const {lbl,type,errMsg,value,fnChange,name,criteria,options,values,readOnly} = props;

const fnprepareInputControls =()=>{
  switch(type){
    case 'text':
      case 'password' :
        case 'number':
          return <input className='form-control' disabled={readOnly} value={value} name={name} type={type} onChange={fnChange}/>
case 'radio':
  return options.map((opt,ind)=>{
return <Fragment><input className='ms-3' checked={values[ind] === value}  value={values[ind]}  name={name} type={type} onChange={fnChange}/><span className='ms-1'>{opt}</span></Fragment>
  })
case 'checkbox':
  const setValues = value.split(',')
  return options.map((opt,ind)=>{
    return <Fragment><input className='ms-3' checked={setValues.includes(values[ind])} value={values[ind]} name={name} type={type} onChange={fnChange}/><span className='ms-1'>{opt}</span></Fragment>
      })

  }
}



  return (
    <div className='row mb-2'>
<div className='col-sm-5 text-end'><b>{lbl}{criteria?.length>0 &&<span className='text-danger'>*</span>}:</b></div>
<div className='col-sm-3 '>
  {fnprepareInputControls()}
</div>
<div className='col-sm-4 text-danger'>
  <b>{errMsg}</b>
</div>
</div>
  )
}

export default Input