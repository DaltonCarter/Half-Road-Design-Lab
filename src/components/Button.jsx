import React from 'react'

function Button({type, onClick}) {
  return (
    <button onClick={onClick}>{type}</button>
  )
}

export default Button