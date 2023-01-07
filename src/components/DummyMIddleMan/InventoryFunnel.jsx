import React, {useState} from 'react'
import Loot from '../DummyComponents/Loot'
import ShopScene from '../ShopScene/ShopScene'
import InventoryDisplay from '../InventoryDisplay/InventoryDisplay'
import Button from '../Button'

let dummyEquipment = [{
  "id": 1,
  "type": "Weapon",
  "name": "Short Sword",
  "atk-pwr": 5,
  "price": 200,
  "s-price": 100,
  "amount": 0,
  "desc": "A simple short sword, made so that even the untrained can use it."
  },

  {
      "id": 2,
      "type": "Armor",
      "name": "Leather Armor",
      "def-pwr": 5,
      "price": 200,
      "s-price": 100,
      "amount": 0,
      "desc": "A suit of light armor made from tanned leather."
  }]

// playerItems={playerItems} playerKeyItems={playerKeyItems}
const InventoryFunnel = ({displayHandler}) => {
    const [playerItems, setPlayerItems] =useState([])
    const [playerEquipment, setPlayerEquipment] =useState([])
    const [playerKeyItems, setPlayerKeyItems] = useState([])
    const [wallet, setWallet] =useState(0)
    

    const handleIncrease = (base, increase) => {
      let result = base + increase
      return result
    }

    const handleWallet = (amount) => {
        let newBalance = wallet + amount
         setWallet(newBalance)
        
    }
    
    
    const handleAddEquipment = (equip) =>{
        
      let { id, amount } = equip;
      console.log(id, amount);
    
      const existingItem = playerEquipment.find(item => item.id === id);
    
      if (existingItem) {
        console.log(playerEquipment);
        const updatedInventory = [...playerEquipment];
        const existingIndex = updatedInventory.indexOf(existingItem);
        console.log(updatedInventory[existingIndex].amount);
        updatedInventory[existingIndex] = {
          ...updatedInventory[existingIndex],
          amount: updatedInventory[existingIndex].amount + amount
        };
        setPlayerEquipment(updatedInventory);
        console.log(updatedInventory[existingIndex].amount);
      } else {
        console.log("ping");
        setPlayerEquipment([...playerEquipment, equip]);
      }

       
    }
    
    
    const handleAddConsumable = (item) =>{
      let { id, amount } = item;
      console.log(id, amount);
    
      const existingItem = playerItems.find(item => item.id === id);
    
      if (existingItem) {
        // console.log(playerEquipment);
        const updatedInventory = [...playerItems];
        const existingIndex = updatedInventory.indexOf(existingItem);
        // console.log(updatedInventory[existingIndex].amount);
        updatedInventory[existingIndex] = {
          ...updatedInventory[existingIndex],
          amount: updatedInventory[existingIndex].amount + amount
        };
        setPlayerItems(updatedInventory);
        // console.log(updatedInventory[existingIndex].amount);
      } else {
        console.log("ping");
        setPlayerItems([...playerItems, item]);
      }
    }
    
    const handleAddKeyItem = (kItem) => {
      const existingKeyItem = playerKeyItems.find((e) => e.name === KeyItems.name)
      if(existingKeyItem) {
          
          
      }else {
        setPlayerKeyItems([...playerKeyItems, kItem])
        
      }
    }

      

    

  return (
    <section>
    <Loot displayHandler={displayHandler} handleWallet={handleWallet} handleAddConsumable={handleAddConsumable} handleAddEquipment={handleAddEquipment} handleAddKeyItem={handleAddKeyItem}/>
    {/* <ShopScene setWallet={setWallet} wallet={wallet} handleWallet={handleWallet} handleAddConsumable={handleAddConsumable} handleAddEquipment={handleAddEquipment}/> */}
    <div className='player-inv-display'>
      <InventoryDisplay wallet={wallet} playerEquipment={playerEquipment}  playerItems={playerItems} playerKeyItems={playerKeyItems}/>
       </div>
    </section>
  )
}

export default InventoryFunnel