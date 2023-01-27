import React, {useContext, useState} from 'react'
import Button from '../Button'
import InventoryContext from '../Store/InventoryContext'
import InventoryModal from './InventoryModal'
import StatsModal from './StatsModal'
import EquipModal from './EquipModal'
import {NavLink} from 'react-router-dom'


const Backdrop = () => {
    return <div className='backdrop'/>
}

const ModalOverlay = ({inventory, handleSecondModal}) => {
    return(
        <div className='modal'>
            <h1 className='menu-title'>Main Menu:</h1>
        <div className='menu-selections'>
        <Button className="menu-button" onClick={() => handleSecondModal('Inventory')} type='Inventory'/>
        <Button className="menu-button" onClick={() => handleSecondModal('Stats')} type='Stats'/>
        <Button className="menu-button" onClick={() => handleSecondModal('Equip')} type='Equip'/>
        <NavLink to={'/'}><Button className="menu-button" type={'Quit Game'}/></NavLink>
        </div>
        <p className='wallet'>Xal: {inventory.wallet}</p>
        </div>
    )
}



const MenuModal = () => {
    let inventory = useContext(InventoryContext)
    const [displayInventoryModal, setDisplayInventoryModal] = useState(false)
    const [displayStatsModal, setDisplayStatsModal] = useState(false)
    const [displayEquipModal, setDisplayEquipModal] = useState(false)

    const handleSecondModal = (type) => {
        if(type === 'Inventory'){
            setDisplayEquipModal(false)
            setDisplayStatsModal(false)
            setDisplayInventoryModal(!displayInventoryModal)
            
        }else if (type === 'Stats'){
            setDisplayEquipModal(false)
            setDisplayInventoryModal(false)
            setDisplayStatsModal(!displayStatsModal)

        }else if (type === 'Equip'){
            setDisplayInventoryModal(false)
            setDisplayStatsModal(false)
            setDisplayEquipModal(!displayEquipModal)
        }
    }

  return (
    <section>
    <Backdrop />
    <ModalOverlay inventory={inventory} handleSecondModal={handleSecondModal}/>
    {displayInventoryModal && <InventoryModal handleSecondModal={handleSecondModal}/>}
    {displayStatsModal && <StatsModal handleSecondModal={handleSecondModal}/>}
    {displayEquipModal && <EquipModal handleSecondModal={handleSecondModal}/>}
     </section>
  )
}

export default MenuModal