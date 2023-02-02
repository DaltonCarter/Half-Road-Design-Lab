import {createContext, useState} from 'react'

const InventoryContext = createContext({
    wallet: null,
    playerItems: [],
    playerEquipment: [],
    playerKeyItems: [],
    handleWallet: () => {},
    handleAddEquipment: () => {},
    handleAddConsumable: () => {},
    handleAddKeyItem: () => {},
    setPlayerEquipment: () => {},
    setPlayerItems: () => {},
    setPlayerKeyItems: () => {},
    setWallet: () => {}

})

export const InventoryContextProvider = (props) => {
    const [playerItems, setPlayerItems] =useState([])
    const [playerEquipment, setPlayerEquipment] =useState([])
    const [playerKeyItems, setPlayerKeyItems] = useState([])
    const [wallet, setWallet] = useState(0)

  
      const handleWallet = (amount, type) => {
        if(type === 'Increase'){
          let newBalance = wallet + amount
           setWallet(newBalance)
        }else if (type === 'Decrease') {
          let newBalance = wallet - amount
           setWallet(newBalance)
        }
          
      }
      
      const handleAddEquipment = (equip) =>{
          console.log(equip)
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
        console.log(item, id, amount);
      
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

      const handleRemoveItem = (type, item, amount) => {
        
        if(type === 'remove'){
          console.log('remove ping')
          let modifiedInventory = [...playerItems]
          let id = item.id
          let index = modifiedInventory.findIndex((item) => item.id === id)
          modifiedInventory.splice(index, 1)
          console.log(modifiedInventory)
          setPlayerItems(modifiedInventory)
        }else if(type === 'modify'){
          let modifiedInventory = [...playerItems]
          let id = item.id
          let index = modifiedInventory.findIndex((item) => item.id === id)
          modifiedInventory[index] = {
            ...modifiedInventory[index],
            amount: modifiedInventory[index].amount - +amount
        }
        setPlayerItems(modifiedInventory)
      }
    }
    
      const handleRemoveEquip = (type, equip, amount) => {
        if(type === 'remove'){
          console.log('remove ping')
          let modifiedInventory = [...playerEquipment]
          let id = equip.id
          let index = modifiedInventory.findIndex((item) => item.id === id)
          modifiedInventory.splice(index, 1)
          console.log(modifiedInventory)
          setPlayerEquipment(modifiedInventory)
        }else if(type === 'modify'){
          let modifiedInventory = [...playerEquipment]
          let id = equip.id
          let index = modifiedInventory.findIndex((item) => item.id === id)
          modifiedInventory[index] = {
            ...modifiedInventory[index],
            amount: modifiedInventory[index].amount - +amount
        }
        setPlayerEquipment(modifiedInventory)
      }else if(type === 'Equipped'){
        let id = equip.id
        const index = playerEquipment.findIndex((item) => item.id === id)
        console.log(index)
        if(playerEquipment[index].amount === 1){
          console.log('ping')
          let modifiedInventory = [...playerEquipment]
          modifiedInventory.splice(index, 1)
          console.log(modifiedInventory)
          setPlayerEquipment(modifiedInventory)
        }else {
          let modifiedInventory = [...playerEquipment]
          modifiedInventory[index] = {
            ...modifiedInventory[index],
            amount: modifiedInventory[index].amount - +amount
        }
        setPlayerEquipment(modifiedInventory)
        }
    
      }
      }
  
    let contextValue = {
        wallet,
        playerItems,
        playerEquipment,
        playerKeyItems,
        handleWallet,
        handleAddConsumable,
        handleAddEquipment,
        handleAddKeyItem,
        handleRemoveItem,
        handleRemoveEquip,
        setPlayerEquipment,
        setPlayerItems,
        setPlayerKeyItems,
        setWallet 

    }

    return (
        <InventoryContext.Provider value={contextValue}>
            {props.children}
        </InventoryContext.Provider>
    )
}

export default InventoryContext