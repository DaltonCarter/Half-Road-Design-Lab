import React, {useContext, useState} from 'react'
import Button from '../Button'
import InventoryContext from '../Store/InventoryContext'
import InventoryModal from './InventoryModal'
import StatsModal from './StatsModal'
import EquipModal from './EquipModal'
import {NavLink, useNavigate} from 'react-router-dom'
import AuthContext from '../Store/authContext'
import SaveGameModal from './SaveGameModal'


const Backdrop = () => {
    return <div className='backdrop'/>
}

const ModalOverlay = ({inventory, handleSecondModal, menuToggle}) => {
   const navigate = useNavigate()
    const authCtx = useContext(AuthContext)
    return(
        <div className='modal'>
            <h1 className='menu-title'>Main Menu:</h1>
        <div className='menu-selections'>
        <Button className="menu-button hover:bg-gray-300 focus:translate-y-1" onClick={() => handleSecondModal('Inventory')} type='Inventory'/>
        <Button className="menu-button hover:bg-gray-300 focus:translate-y-1" onClick={() => handleSecondModal('Stats')} type='Stats'/>
        <Button className="menu-button hover:bg-gray-300 focus:translate-y-1" onClick={() => handleSecondModal('Equip')} type='Equip'/>
        {authCtx.token && <Button className="menu-button hover:bg-gray-300 focus:translate-y-1" onClick={() => handleSecondModal('Save')} type={'Save Game'}/>}
        {authCtx.token && <Button className="menu-button hover:bg-gray-300 focus:translate-y-1" onClick={() => navigate('/Load')} type={'Load Game'}/>}
        <Button className="menu-button hover:bg-gray-300 focus:translate-y-1" onClick={() => menuToggle()} type={'Close Menu'}/>
        {authCtx.token ? <NavLink to={'/'}><Button className="menu-button hover:bg-gray-300 focus:translate-y-1" onClick={() => authCtx.logout()} type={'Logout'}/></NavLink> : <NavLink to={'/'}><Button className="menu-button hover:bg-gray-300 focus:translate-y-1" onClick={() => setTimeout(() => {window.location.reload()}, 500)} type={'Quit Game'}/></NavLink>}
        </div>
        <p className='wallet'>Xal: {inventory.wallet}</p>
        </div>
    )
}



const MenuModal = ({menuToggle}) => {
    let inventory = useContext(InventoryContext)
    const [displayInventoryModal, setDisplayInventoryModal] = useState(false)
    const [displayStatsModal, setDisplayStatsModal] = useState(false)
    const [displayEquipModal, setDisplayEquipModal] = useState(false)
    const [displaySaveModal, setDisplaySaveModal] = useState(false)

    const handleSecondModal = (type) => {
        if(type === 'Inventory'){
            setDisplayEquipModal(false)
            setDisplayStatsModal(false)
            setDisplaySaveModal(false)
            setDisplayInventoryModal(!displayInventoryModal)
            
        }else if (type === 'Stats'){
            setDisplayEquipModal(false)
            setDisplayInventoryModal(false)
            setDisplaySaveModal(false)
            setDisplayStatsModal(!displayStatsModal)

        }else if (type === 'Equip'){
            setDisplayInventoryModal(false)
            setDisplayStatsModal(false)
            setDisplaySaveModal(false)
            setDisplayEquipModal(!displayEquipModal)

        } else if (type === 'Save'){
            setDisplayInventoryModal(false)
            setDisplayStatsModal(false)
            setDisplayEquipModal(false)
            setDisplaySaveModal(!displaySaveModal)
        }
    }

  return (
    <section>
    <Backdrop />
    <ModalOverlay inventory={inventory} handleSecondModal={handleSecondModal} menuToggle={menuToggle}/>
    {displayInventoryModal && <InventoryModal handleSecondModal={handleSecondModal}/>}
    {displayStatsModal && <StatsModal handleSecondModal={handleSecondModal}/>}
    {displayEquipModal && <EquipModal handleSecondModal={handleSecondModal}/>}
    {displaySaveModal && <SaveGameModal handleSecondModal={handleSecondModal}/>}
     </section>
  )
}

export default MenuModal