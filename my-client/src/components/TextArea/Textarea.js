import React from 'react'

const Textarea = (props) => {
    const {lbl,errMsg,value,fnChange,name,criteria} = props;
  return (
    <div className='row mb-2'>
<div className='col-sm-5 text-end'><b>{lbl}{criteria?.length>0 &&<span className='text-danger'>*</span>}:</b></div>
<div className='col-sm-3 '>
    <textarea name={name} onChange={fnChange} value={value} className='form-control'></textarea>
    </div>
<div className='col-sm-4 text-danger'>
  <b>{errMsg}</b>
</div>
</div>
  )
}

export default Textarea;