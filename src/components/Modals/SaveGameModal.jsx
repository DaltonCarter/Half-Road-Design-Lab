import React, {useContext, useState} from 'react'
import Button from '../Button'
import InventoryContext from '../Store/InventoryContext'
import PlayerContext from '../Store/PlayerContext'
import authContext from '../Store/authContext'
import axios from 'axios'


const Backdrop = () => {
    return <div className='secondary-backdrop parchment-bg bg-cover bg-clip-padding '/>
}

const ModalOverlay = ({saveMessage, setSaveMessage, handleSecondModal, userId, character, level, currentExp, nextLevel, weapon, shield, helm, armor, accessory, items, equipment, keyItems, wallet}) => {
  
   const handleSave = async () => {
    setSaveMessage('Now Saving!')
    
    let body = {
      character: character,
      level: level,
      currentExp: currentExp,
      nextLevel: nextLevel,
      weapon: weapon,
      shield: shield,
      helm: helm,
      armor: armor,
      accessory: accessory,
      items: items,
      equipment: equipment,
      keyItems: keyItems,
      wallet: wallet,
      userId: userId
    }
    
    await axios.post('/save', body)
      .then(() => {
        console.log('Save Complete!!')
        setSaveMessage('Save Complete!')
        handleSecondModal('Save')
      })
      .catch((err) => {
        console.log('Error in Save return!')
        console.log(err)
        setSaveMessage('Save Failed!')
      })
   }

    return(
        <div className='secondary-modal flex flex-col items-center text-center'>
            <h1 className='menu-title m-3'>Save Game:</h1>
            <h3 className='font-bold text-2xl italic underline'>{saveMessage}</h3>
            <table className='m-3 w-full border-double border-black border-8'>
                <thead>
                    <tr>
                <th colSpan='4'>Character Stats:</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Name:</td>
                    <td>{character.name}</td>
                </tr>
                <tr>
                    <td>Level:</td>
                    <td>{level}</td>
                </tr>
                <tr>
                    <td>Current Experience:</td>
                    <td>{currentExp}</td>
                    <td>To Next Level:</td>
                    <td>{nextLevel}</td>
                </tr>
                </tbody>
            </table>
            <table className='w-full border-double border-black border-8'>
                <thead>
                    <tr>
                <th colSpan='2'>Attributes:</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Name:</td>
                    <td>Base Value:</td>

                </tr>
                <tr>
                    <td>HP:</td>
                    <td>{character.hp}/{character.maxHP}</td>
                </tr>
                <tr>
                    <td>Attack:</td>
                    <td>{character.atk}</td>

                </tr>
                <tr>
                    <td>Defense:</td>
                    <td>{character.def}</td>

                </tr>
                <tr>
                    <td>Agility:</td>
                    <td>{character.agi}</td>

                </tr>
                </tbody>
            </table>

          <Button className={'menu-btn text-2xl font-semibold m-5 border-8 border-double border-gray-800 bg-clip-padding w-44 h-28 rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1'} onClick={() => handleSave()} type={'Save'}/>
          <Button className={'menu-btn text-2xl font-semibold m-5 border-8 border-double border-gray-800 bg-clip-padding w-44 h-28 rounded-lg shadow-xl bg-red-500 hover:bg-red-300 focus:translate-y-1'} onClick={() => handleSecondModal('Save')} type={'Close'}/>

        </div>
    )
}



const SaveGameModal = ({handleSecondModal}) => {
  const inventory = useContext(InventoryContext)
  const playerData = useContext(PlayerContext)
  const authCtx = useContext(authContext)
  let wallet = inventory.wallet
  let items = inventory.playerItems
  let equipment = inventory.playerEquipment
  let keyItems = inventory.playerKeyItems
  let character = playerData.Character
  let level = playerData.level
  let currentExp = playerData.currentExp
  let nextLevel = playerData.nextLevel
  let weapon = playerData.weaponSlot.id
  let shield = playerData.shieldSlot.id
  let helm = playerData.helmSlot.id
  let armor = playerData.armorSlot.id
  let accessory = playerData.accessorySlot.id
  let userId = authCtx.userId
  

  const [saveMessage, setSaveMessage] = useState('Do you want to save?')

  return (
    <div>
    <Backdrop/>
    <ModalOverlay saveMessage={saveMessage} setSaveMessage={setSaveMessage} handleSecondModal={handleSecondModal} character={character} level={level} currentExp={currentExp} nextLevel={nextLevel} weapon={weapon} shield={shield} helm={helm} armor={armor} accessory={accessory} wallet={wallet} items={items} equipment={equipment} keyItems={keyItems} userId={userId}/>
    </div>
  )
}

export default SaveGameModal