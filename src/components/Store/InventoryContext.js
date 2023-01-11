import {createContext, useState} from 'react'

const InventoryContext = createContext({
    wallet: null,
    playerItems: [],
    playerEquipment: [],
    playerKeyItems: [],
    handleWallet: () => {},
    handleAddEquipment: () => {},
    handleAddConsumable: () => {},
    handleAddKeyItem: () => {}

})

export const InventoryContextProvider = (props) => {
    const [playerItems, setPlayerItems] =useState([])
    const [playerEquipment, setPlayerEquipment] =useState([])
    const [playerKeyItems, setPlayerKeyItems] = useState([])
    const [wallet, setWallet] = useState(0)


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
  
    let contextValue = {
        wallet,
        playerItems,
        playerEquipment,
        playerKeyItems,
        handleWallet,
        handleAddConsumable,
        handleAddEquipment,
        handleAddKeyItem

    }

    return (
        <InventoryContext.Provider value={contextValue}>
            {props.children}
        </InventoryContext.Provider>
    )
}

export default InventoryContext