import React from 'react'
import Button from '../Button'
import axios from 'axios'


const SaveFileDisplay = ({save, setLoadId, setGetFiles}) => {

  const deleteHandler = async (id) => {

    await axios.delete(`/delete/${id}`)
    .then((res) => {
      console.log(res, 'File Deleted!!')
      setGetFiles(true)
    })
    .catch((err) => console.log('Error in deleting file!!', err))

  }

  return (
    <div>
        <p>File: {save.id}</p>
        <p>Name: {save.name}</p>
        <p>Level: {save.level}</p>
        <p>Level Progress: {save.currentExp}/{save.nextLevel}</p>
        <Button onClick={() => setLoadId(save.id)} type={'Load'}/>
        <Button onClick={() => deleteHandler(save.id)} type={'Delete'}/>
        

    </div>
  )
}

export default SaveFileDisplay