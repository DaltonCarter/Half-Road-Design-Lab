import React, {useContext, useState} from 'react'
import Button from '../Button'
import InventoryContext from '../Store/InventoryContext'
import InventoryDisplay from '../InventoryDisplay/InventoryDisplay'


const Backdrop = () => {
    return <div className='secondary-backdrop'/>
}

const ModalOverlay = ({ handleSecondModal, displayHandler, displayEquipment, displayItems, displayKeyItems}) => {
    return(
        <div className='secondary-modal'>
            <h1 className='menu-title'>Inventory:</h1>
            <div className='selection-container'>
            <h1 className='type'>Type:</h1> 
            <Button className={'inventory-button'} onClick={() => displayHandler('Items')} type='Items'/> 
            <Button className={'inventory-button'} onClick={() => displayHandler('Equip')} type='Equipment'/>
            <Button className={'inventory-button'} onClick={() => displayHandler('Key Items')} type='Key Items'/>
            <Button className={'inventory-button'} onClick={() => handleSecondModal('Inventory')} type='Close'/>
            </div>
            <div>
            {displayItems && <InventoryDisplay type={'Items'}/>}
            {displayEquipment && <InventoryDisplay type={'Equip'}/>}    
            {displayKeyItems && <InventoryDisplay type={'Key Items'}/>}
            </div>
        </div>
    )
}



const InventoryModal = ({handleSecondModal}) => {
    let inventory = useContext(InventoryContext)
    const [displayItems, setDisplayItems] = useState(false)
    const [displayEquipment, setDisplayEquipment] = useState(false)
    const [displayKeyItems, setDisplayKeyItems] = useState(false)

    const displayHandler = (type) => {
        if( type === 'Items'){
            console.log("Items", type)
                setDisplayEquipment(false)
                setDisplayKeyItems(false)
                setDisplayItems(!displayItems)
            
        }
         if (type === 'Equip'){
            console.log("Equipment", type)
                setDisplayKeyItems(false)
                setDisplayItems(false)
                setDisplayEquipment(true)
            
        }
         if (type === 'Key Items'){
                console.log("Key Items", type)
                setDisplayItems(false)
                setDisplayEquipment(false)
                setDisplayKeyItems(true)
            
        }
    }

  return (
    <section>
    <Backdrop />
    <ModalOverlay inventory={inventory} handleSecondModal={handleSecondModal} displayHandler={displayHandler} displayEquipment={displayEquipment} displayItems={displayItems} displayKeyItems={displayKeyItems} />
    
     </section>
  )
}

export default InventoryModal