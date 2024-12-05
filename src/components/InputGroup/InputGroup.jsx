import React from 'react'
import './index.scss'

export default function InputGroup({fieldName, placeholder, label, value, onChange}) {
  return (
    <div className='input-group'>
      <label htmlFor={fieldName}>
        {label}
      </label>
      <input type="text" onChange={onChange} placeholder={placeholder} id={fieldName} name={fieldName} value={value}/>
    </div>
  )
}
