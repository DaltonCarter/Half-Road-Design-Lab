import React, {useContext} from 'react'
import Button from '../Button'
import Equipment from '../../Server/Equipment.json'
import Items from '../../Server/Items.json'
import KeyItems from '../../Server/Key-Items.json'
import InventoryContext from '../Store/InventoryContext'
import PlayerContext from '../Store/PlayerContext'

function Loot({displayHandler}) {
const inventory = useContext(InventoryContext)
const playerCtx = useContext(PlayerContext)




  const randomMoney= () => {
    let amount = Math.floor(Math.random() * 1000)
     inventory.handleWallet(amount, 'Increase')
  }

  const randomItem= () => {
    const itemDrop = Math.floor(Math.random() * 11)
    if(itemDrop > 0){
      const item = Items[ Math.floor(Math.random() * Items.length)]
      console.log(item)
         item.amount = 1
    inventory.handleAddConsumable(item)
    } 
    else {
      console.log('You get NOTHING~')
    }
  }

  const randomEquipment= () => {
    const equipDrop = Math.floor(Math.random() * 3)
    console.log(equipDrop)
    if(equipDrop > 0){
    const equip = Equipment[ Math.floor(Math.random() * Equipment.length)]
    equip.amount = 1

    console.log(equip)
    inventory.handleAddEquipment(equip)
    } else {
      console.log('You get NOTHING~')
    }
    
  }

  const randomKeyItem= () => {

  }
    
const gainExp = () => {
  console.log(playerCtx.currentExp)
  let currentXp = playerCtx.currentExp
  let randomXp = Math.floor(Math.random() * 500)
  let newXp = currentXp + randomXp
  console.log(newXp)
  playerCtx.setCurrentExp(newXp)
}

  return (
    <div className='money-gain-modal'>
        
        <Button onClick={() => randomMoney()} type={'Money Button'}/>
        <Button onClick={() => randomItem()} type={'Item Button'}/>
        <Button onClick={() => randomEquipment()} type={'Equipment Button'}/>
        {/* <Button onClick={() => handleAddKeyItem(keyItem)} type={'Equipment Button'}/> */}
        <Button onClick={() => gainExp()} type={'Experience Button'}/>
        <Button onClick={() => playerCtx.fullHeal()} type={'Heal'}/>
        <Button onClick={displayHandler} type={'Close'}/>
    </div>
    
  )
}

export default Loot