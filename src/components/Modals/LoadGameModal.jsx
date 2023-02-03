import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import Equipment from '../../Databases/Equipment.json'
import KeyItems from '../../Databases/Key-Items.json'
import PlayerContext from '../Store/PlayerContext'
import InventoryContext from '../Store/InventoryContext'
import AuthContext from '../Store/authContext'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import SaveFileDisplay from './SaveFileDisplay'



// BEGIN LOAD GAME FUNCTIONALITY
const Backdrop = () => {
    return <div className='loot-backdrop parchment-bg bg-cover flex flex-col justify-center items-center'/>
  }
  
  const ModalOverlay = ({saveFiles, setDisplayLoad, setGetFiles}) => {
    const navigate = useNavigate()
    const playerCtx = useContext(PlayerContext)
    const inventory = useContext(InventoryContext)
    const [loadId, setLoadId] = useState (0)

    useEffect(() => {
      if(loadId === 0){

      }else{ 
        console.log(loadId)
        getSpecificFile(loadId)
        
      }
    }, [loadId])
    
     const getSpecificFile = async (id) => {
      console.log(id)
      await axios.get(`/load/${id}`)
       .then((res) => {
        console.log(res.data)
        let file = res.data
        console.log(file)
        handleLoad(file)
      })
       .catch((err) => console.log('This freakin load thing is STILL on the Fritz', err))
     }

    const handleLoad = (file) => {
      
      console.log(file)
      let characterData = JSON.parse(file.characterData) 
      playerCtx.setCharacter(characterData)  
      playerCtx.setLevel(file.level)
      playerCtx.setCurrentExp(file.currentExp)
      playerCtx.setNextLevel(file.nextLevel)
      let itemInventory = JSON.parse(file.items)
      let equipInventory = JSON.parse(file.equipment)
      let keyItemsInventory = JSON.parse(file.keyItems)
      inventory.setPlayerItems(itemInventory)
      inventory.setPlayerEquipment(equipInventory)
      inventory.setPlayerKeyItems(keyItemsInventory)
      inventory.setWallet(file.wallet)
      let foundWeapon = Equipment.filter((w) => w.id === file.weapon)
      let weapon = foundWeapon[0]
      playerCtx.setWeaponSlot(weapon)
      let foundShield = Equipment.filter((s) => s.id === file.shield)
      let shield = foundShield[0]
      playerCtx.setShieldSlot(shield)
      let foundHelm = Equipment.filter((h) => h.id === file.helm)
      let helm = foundHelm[0]
      playerCtx.setHelmSlot(helm)
      let foundArmor = Equipment.filter((a) => a.id === file.armor)
      let armor = foundArmor[0]
      playerCtx.setArmorSlot(armor)
      let foundAccessory = Equipment.filter((ac) => ac.id === file.accessory)
      let accessory = foundAccessory[0]
      playerCtx.setAccessorySlot(accessory)
      navigate('/Game')

    }

    return(
        <div className='loot-modal'>
          {saveFiles.map((save) => {
            return (
             <SaveFileDisplay save={save} setLoadId={setLoadId} setGetFiles={setGetFiles}/>
              
            )
          })} 
          <Button onClick={() => setDisplayLoad(false)} type={'Close'}/>
        </div>
    )
  }

// END OF LOAD GAME FUNCTIONALITY

// BEGIN FUNCTIONALITY FOR NEW USER NEW GAME
const NewGameOverlay = () => {
  const Player = useContext(PlayerContext)
    const Inventory = useContext(InventoryContext)
    const navigate = useNavigate()
    const Character = Player.Character
    const [name, setName] = useState('Arahc')
    const keyItems = KeyItems
  


    const handleCharacter = () => {
    Character.name = name
    let newItem = keyItems[0]
    Inventory.handleAddKeyItem(newItem)
    navigate('/Intro')
    }

  return(
    <div className='loot-modal flex flex-col justify-center items-center'>
    <h2 className='m-5 text-xl font-bold'>Please name your Character!</h2>
            <input className='border-8 border-double border-black bg-clip-padding p-2 m-5 text-xl italic w-72 h-14' defaultValue={name} placeholder={'name your Character'} onChange={(e) => setName(e.target.value)}/>
            <Button className='m-5 border-8 border-double border-black w-60 h-14 bg-clip-padding rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1' onClick={() => handleCharacter()} type={'Confim and Begin game!'}/>
            </div>
  )
}

// END OF NEW GAME FOR NEW USER FUNCTIONALITY

const LoadGameModal = ({setDisplayLoad}) => {
  const authCtx = useContext(AuthContext)
  const [saveFiles, setSaveFiles] =useState()
  const [getFiles, setGetFiles] = useState(true)



    const retrieveSaveFiles = async () => {
      let userId = authCtx.userId
      console.log(userId)
      
      
      await axios.get(`/loadScreen/${userId}`)
      .then((res) => {
        console.log('ping?', res.data)
        setSaveFiles([...res.data])})
        setGetFiles(false)
      .catch((err) => {
        console.log('Error in retrieveing files!')
        console.log(err)
      })
    }

  useEffect(() => {
    if(getFiles === true){
      retrieveSaveFiles()
    }
    
  }, [getFiles])
  return (
    <div>
        <Backdrop/>
        {saveFiles === {} ? <ModalOverlay setGetFiles={setGetFiles} saveFiles={saveFiles} setDisplayLoad={setDisplayLoad}/> : <NewGameOverlay /> }
        
    </div>
  )
}

export default LoadGameModal