import React from 'react'

function Button({type, onClick, className}) {
  return (
    <button className={className} onClick={onClick}>{type}</button>
  )
}

export default Button