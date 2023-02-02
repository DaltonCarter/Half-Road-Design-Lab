import React from 'react'
import Button from '../Button'


const SaveFileDisplay = ({save, setLoadId}) => {
  return (
    <div>
        <p>File: {save.id}</p>
        <p>Name: {save.name}</p>
        <p>Level: {save.level}</p>
        <p>Level Progress: {save.currentExp}/{save.nextLevel}</p>
        <Button onClick={() => setLoadId(save.id)} type={'Load'}/>

    </div>
  )
}

export default SaveFileDisplay