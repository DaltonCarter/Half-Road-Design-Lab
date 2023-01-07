import React from 'react'
import Button from '../Button'
import Equipment from '../../Server/Equipment.json'
import Items from '../../Server/Items.json'
import KeyItems from '../../Server/Key-Items.json'

function Loot({handleWallet, handleAddConsumable, handleAddEquipment, handleAddKeyItem, displayHandler}) {

  const randomMoney= () => {
    let amount = Math.floor(Math.random() * 1000)
    return handleWallet(amount)
  }

  const randomItem= () => {
    const itemDrop = Math.floor(Math.random() * 11)
    if(itemDrop > 0){
      const item = Items[ Math.floor(Math.random() * Items.length)]
      console.log(item)
         item.amount = 1
    handleAddConsumable(item)
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
    handleAddEquipment(equip)
    } else {
      console.log('You get NOTHING~')
    }
    
  }

  const randomKeyItem= () => {

  }
    


  return (
    <div className='money-gain-modal'>
        
        <Button onClick={() => randomMoney()} type={'Money Button'}/>
        <Button onClick={() => randomItem()} type={'Item Button'}/>
        <Button onClick={() => randomEquipment()} type={'Equipment Button'}/>
        {/* <Button onClick={() => handleAddKeyItem(keyItem)} type={'Equipment Button'}/> */}
        <Button onClick={displayHandler} type={'Close'}/>
    </div>
    
  )
}

export default Loot