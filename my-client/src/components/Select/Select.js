import React from 'react'
const Select = (props) => {
    const {lbl,errMsg,value,fnChange,name,criteria,options,values} = props;
  return (
    <div className='row mb-2'>
<div className='col-sm-5 text-end'><b>{lbl}{criteria?.length>0 &&<span className='text-danger'>*</span>}:</b></div>
<div className='col-sm-3 '>
    <select name={name} onChange={fnChange} className='form-control'>
  <option value="">Please select....</option>
  {
    options.map((opt,ind)=>{
return <option key={`option_${ind}`} value = {values[ind]}>{opt}</option>
    })
  }

    </select>
    </div>
<div className='col-sm-4 text-danger'>
  <b>{errMsg}</b>
</div>
</div>
  )
}

export default Select;