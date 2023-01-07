import items from './Items.json'
import equipment from './Equipment.json'
import keyItems from './Key-Items.json'

let wallet = 0
// let equipInventory = []
// let itemInventory = []
// let keyItemsInventory =[]

 [
    {
     handleWallet: (amount) => {
        wallet += amount
         console.log(wallet)
         
    },
    
    
     handleAddEquipment: (equip) => {
        // const existingEquip = playerEquipment.find((e) => e.name === Equipment.name)
        //     if(existingEquip) {
        //         existingEquip.amount++
        //         setPlayerEquipment([...playerEquipment])
        //         return
                
        //     }else {
        //         setPlayerEquipment([...playerEquipment,{equip, amount: 1}])
        //         return(<PlayerInventory playerEquipment={playerEquipment}/>)
        //     }
    },
    
    
    handleAddConsumable: (item) =>{
        // console.log(item)
        // const existingItem = playerItems.find((e) => e.name === item.name)
        //     if(existingItem) {
        //         existingItem.amount++
        //         setPlayerItems([...playerItems])
        //         return(console.log(playerItems))
            
        //     }else {
        //         let newItem = item
        //         newItem.amount = 1
        //         setPlayerItems([...playerItems, newItem])
        //         return(console.log(playerItems))
        
        //     }
    },
    
    handleAddKeyItem: (kItem) => {
    //   const existingKeyItem = playerKeyItems.find((e) => e.name === KeyItems.name)
    //   if(existingKeyItem) {
          
          
    //   }else {
    //     setPlayerKeyItems([...playerKeyItems, kItem])
        
    //   }
    }
}
]