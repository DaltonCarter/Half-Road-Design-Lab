import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import Equipment from '../../Databases/Equipment.json'
import PlayerContext from '../Store/PlayerContext'
import InventoryContext from '../Store/InventoryContext'
import AuthContext from '../Store/authContext'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import SaveFileDisplay from './SaveFileDisplay'

const Backdrop = () => {
    return <div className='loot-backdrop'/>
  }
  
  const ModalOverlay = ({saveFiles}) => {
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
      navigate('/')

    }

    return(
        <div className='loot-modal'>
          {saveFiles.map((save) => {
            return (
             <SaveFileDisplay save={save} setLoadId={setLoadId}/>
              
            )
          })} 
        </div>
    )
  }


const LoadGameModal = () => {
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
        {saveFiles ? <ModalOverlay saveFiles={saveFiles}/> : <p>Loading Savve Files...</p>}
    </div>
  )
}

export default LoadGameModal