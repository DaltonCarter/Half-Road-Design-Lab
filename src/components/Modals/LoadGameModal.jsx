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
  
  const ModalOverlay = ({saveFiles, setGetFiles}) => {
    const navigate = useNavigate()
    const playerCtx = useContext(PlayerContext)
    const inventory = useContext(InventoryContext)
    const [loadId, setLoadId] = useState (0)
    const [warning, setWarning] = useState(false)

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

    const handleNewGame = () => {
      if(saveFiles.length === 0){
        navigate('/Start')
      }else{
        setWarning(true)
      }
    }

    return(
      
        <div className='loot-modal flex flex-col items-center'>
              {!warning && <Button className='m-5 font-bold border-8 border-double border-black w-36 h-14 bg-clip-padding rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1' onClick={() => handleNewGame()} type={'Start New Game'}/>}
        {warning && <section className='flex flex-col items-center'>
          <h1 className='m-5 text-red-600 text-center text-2xl font-extrabold italic underline'>WARNING!!! Starting a new game when you have Saves from another run may make it so you cannot use your previous file. <br/> I won't stop you, but I will tell you that it is ON YOU to manage your save files so that you don't loose your other game.</h1>
          <p className='text-center text-2xl font-extrabold italic underline'>Proceed anyway?</p>
          <div className='flex'>
          <Button className='m-5 font-bold border-8 border-double border-black w-20 h-10 bg-clip-padding rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1' onClick={() => navigate('/Start')} type={'Yes!'}/>
          <Button className='m-5 font-bold border-8 border-double border-black w-20 h-10 bg-clip-padding rounded-lg shadow-xl bg-red-500 hover:bg-red-300 focus:translate-y-1' onClick={() => setWarning(false)} type={'No!'}/>
          </div>
          </section>}
          {saveFiles.map((save) => {
            return (
             <SaveFileDisplay save={save} setLoadId={setLoadId} setGetFiles={setGetFiles}/>
            )
          })} 
      
        </div>
    )
  }

// END OF LOAD GAME FUNCTIONALITY



const LoadGameModal = ({setDisplayLoad}) => {
  const authCtx = useContext(AuthContext)
  const [saveFiles, setSaveFiles] =useState([])
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
      
      console.log(saveFiles)
      
    }
    
    
  }, [getFiles])
  return (
    <div>
        <Backdrop/>
        <ModalOverlay setGetFiles={setGetFiles} saveFiles={saveFiles} setDisplayLoad={setDisplayLoad}/>
        
    </div>
  )
}

export default LoadGameModal