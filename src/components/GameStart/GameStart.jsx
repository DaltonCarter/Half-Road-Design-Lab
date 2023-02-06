import React, {useContext, useState} from 'react'
import AuthContext from '../Store/authContext'
import PlayerContext from '../Store/PlayerContext'
import InventoryContext from '../Store/InventoryContext'
import KeyItems from '../../Databases/Key-Items.json'
import { useNavigate } from 'react-router-dom'
import LoadGameModal from '../Modals/LoadGameModal'
import Button from '../Button'

const GameStart = () => {
    const authCtx = useContext(AuthContext)
    const Player = useContext(PlayerContext)
    const Inventory = useContext(InventoryContext)
    const navigate = useNavigate()
    const Character = Player.Character
    const [name, setName] = useState('Arahc')
    const keyItems = KeyItems

  const handleCharacter = () => {
    Character.name = name
    let newItem = keyItems[0]
    console.log(newItem)
    Inventory.handleAddKeyItem(newItem)
    navigate('/Intro')
  }

  return (
    <div  className='parchment-bg bg-cover flex flex-col justify-center items-center'>
      {!authCtx.token && <div>
          <h1 className='m-5 text-red-600 text-center text-6xl font-extrabold italic underline'> WARNING!!!</h1>
          <p className='m-5 text-red-600 text-center text-3xl font-extrabold italic underline'>By proceeding without a login, you are accepting that you will not be able to save your
            progress, <br/> and that it will be lost upon; Quitting the game, tab refresh, or closing the browser.
          </p>
          
        </div>}
        {authCtx.token && <h1 className='m-5 text-red-600 text-center text-3xl font-extrabold italic underline'> DO NOT REFRESH YOUR TAB! This will reset ALL of your current Data.<br/> If Your page refreshes or you have to refresh, you will need to reload your last Save.<br/>
        REMEMBER S.E.S.O Save Early, Save Often!</h1>}
        <h1 className='m-1 text-xl font-extrabold italic underline'>CHARACTER GENERATION:</h1>
            <h2 className='m-5 text-xl font-bold'>Please name your Character!</h2>
            <input className='border-8 border-double border-black bg-clip-padding p-2 m-5 text-xl italic w-72 h-14' defaultValue={name} placeholder={'name your Character'} onChange={(e) => setName(e.target.value)}/>
            <Button className='m-5 font-bold border-8 border-double border-black w-60 h-14 bg-clip-padding rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1' onClick={() => handleCharacter()} type={'Confim and Begin game!'}/>

    </div>
  )
}

export default GameStart