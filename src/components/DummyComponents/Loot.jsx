import React from 'react'
import Button from '../Button'

function Loot({amount, wallet, itemInventory, items, equipment, setItemInventory, equipInventory, setEquipInventory, setWallet,  displayHandler}) {

const xalGain = (amount, wallet) => {
  let newBalance = wallet += amount
  setWallet(newBalance)

  console.log(`Your current balance is ${wallet} Xal!`)
}

const itemGain = () => {
  console.log('You got an Item!')
  setItemInventory(itemInventory += 1)
  console.log(`You have ${itemInventory} items`)

//Ok if I am thinking about this correctly I would need to find if the item already exists in the Inventory
//and update the amount if it exists, or add it in if it does not.  Looking at this in type sounds like it will
//be far simpler if I do that in the back end through SQL or typical DB manipulation.

//Inventory ID, and an Item ID, amount to be added/on hand

// let newItems = inventory.findIndex(ite => ite.id = items.id)
  // newItems.amount += items.amount
  // setInventory(prevInventory => [...prevInventory, newItems])

}

  
  


const equipGain = () => {
  console.log('You got a peice of equipment!')
  setEquipInventory(equipInventory += 1)
  console.log(`You have ${equipInventory} pieces of equipment.`)


//Ok if I am thinking about this correctly I would need to find if the equipment already exists in the Inventory
//and update the amount if it exists, or add it in if it does not.  Looking at this in type sounds like it will
//be far simpler if I do that in the back end through SQL or typical DB manipulation.

//Inventory ID, and an equip ID, amount to be added/on hand



  // let newEquip = inventory.findIndex(equip => equip.id = equipment.id)
  // newEquip.amount += equipment.amount
  // setInventory(prevInventory => [...prevInventory, newItems])
}

  return (
    <div className='money-gain-modal'>
        
        <Button onClick={() => xalGain(amount, wallet)} type={'Money Button'}/>
        <Button onClick={() => itemGain()} type={'Item Button'}/>
        <Button onClick={() => equipGain()} type={'Equipment Button'}/>
        <Button onClick={displayHandler} type={'Close'}/>
    </div>
    
  )
}

export default Loot