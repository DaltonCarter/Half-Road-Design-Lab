import React from 'react'
import Button from '../Button'
import axios from 'axios'


const SaveFileDisplay = ({save, setLoadId, setGetFiles}) => {
    let  player = JSON.parse(save.characterData)
    let name = player.name
  const deleteHandler = async (id) => {

    await axios.delete(`/delete/${id}`)
    .then((res) => {
      console.log(res, 'File Deleted!!')
      setGetFiles(true)
    })
    .catch((err) => console.log('Error in deleting file!!', err))

  }

  return (
    <div className='m-5 p-5 border-8 border-double border-black flex flex-col items-center'>
        <p className='m-1 text-xl font-bold underline'>File: {save.id}</p>
        <p className='m-1 text-xl'>Name: {name}</p>
        <p className='m-1 text-xl'>Level: {save.level}</p>
        <p className='m-1 text-xl'>Level Progress: {save.currentExp}/{save.nextLevel}</p>
        <div className='flex'>
        <Button className='m-5 font-bold border-8 border-double border-black w-20 h-10 bg-clip-padding rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1' onClick={() => setLoadId(save.id)} type={'Load'}/>
        <Button className='m-5 font-bold border-8 border-double border-black w-20 h-10 bg-clip-padding rounded-lg shadow-xl bg-red-500 hover:bg-red-300 focus:translate-y-1' onClick={() => deleteHandler(save.id)} type={'Delete'}/>
        </div>
        

    </div>
  )
}

export default SaveFileDisplay