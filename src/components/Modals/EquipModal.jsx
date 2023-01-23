import { useContext, useEffect, useState } from "react";
import InventoryContext from "../Store/InventoryContext";
import PlayerContext from "../Store/PlayerContext";
import Button from "../Button";

const Backdrop = () => {
    return <div className='secondary-backdrop'/>
}

const ModalOverlay = ({ handleSecondModal, Equipment, weaponSlot, shieldSlot, helmSlot, armorSlot, accessorySlot, EquipWeaponHandler, EquipShieldHandler, EquipHelmHandler, EquipArmorHandler, EquipAccessoryHandler}) => {
    return(
        <div className='secondary-modal'>
            <h1 className='menu-title'>Player Equipment:</h1>
            <div className="equip-scene">
            <label for='Weapon'>Weapon: </label>
            <select name='weapon' id="Weapon" onChange={(e) => EquipWeaponHandler(e.target.value)}>
            <option value="" disabled selected>Select an Option</option>
                {Equipment.filter((w) => w.type === 'Weapon').map((w) => (
                    <option value={w.id}>{w.name}</option>
                ))}
            </select>
            <label for='Shield'>Shield: </label>
             <select name='shield' id="Shield" onChange={(e) => EquipShieldHandler(e.target.value)}>
            <option value="" disabled selected>Select an Option</option>
                {Equipment.filter((w) => w.type === 'Shield').map((w) => (
                    <option value={w.id}>{w.name}</option>
                ))}
            </select>
            <label for='Helm'>Helmet: </label>
             <select name='helm' id="Helm" onChange={(e) => EquipHelmHandler(e.target.value)}>
            <option value="" disabled selected>Select an Option</option>
                {Equipment.filter((w) => w.type === 'Helm').map((w) => (
                    <option value={w.id}>{w.name}</option>
                ))}
            </select>
            <label for='Armor'>Armor: </label>
            <select name='Armor' id="Armor" onChange={(e) => EquipArmorHandler(e.target.value)}>
            <option value="" disabled selected>Select an Option</option>
                {Equipment.filter((w) => w.type === 'Armor').map((w) => (
                    <option value={w.name}>{w.name}</option>
                ))}
            </select>
            <label for='Accessory'>Accessory: </label>
            <select name='Accessory' id="Accessory" onChange={(e) => EquipAccessoryHandler(e.target.value)}>
            <option value="" disabled selected>Select an Option</option>
                {Equipment.filter((w) => w.type === 'Accessory').map((w) => (
                    <option value={w.id}>{w.name}</option>
                ))}
            </select>
            </div>
            <h1 className='menu-title'>Current Equipment:</h1>
            <div className="current-equip">
                    <p>Weapon: {weaponSlot !== undefined ? weaponSlot.name : "None"}</p>
                    <p>Shield: {shieldSlot !== undefined ? shieldSlot.name : "None"}</p> 
                    <p>Helmet: {helmSlot !== undefined ? helmSlot.name : "None"}</p>
                    <p>Armor: {armorSlot !== undefined ? armorSlot.name : "None"}</p>
                    <p>Accessory: {accessorySlot !== undefined ? accessorySlot.name : "None"}</p> 
            </div>
            <Button className={'stats-btn'} onClick={() => handleSecondModal('Equip')} type={'Close'}/>
        </div>
    )
}

const EquipModal = ({handleSecondModal}) => {
    const PlayerCtx = useContext(PlayerContext)
    const Inventory = useContext(InventoryContext)
    const {playerEquipment} = Inventory
    const { weaponSlot, shieldSlot, helmSlot, armorSlot, accessorySlot} = PlayerCtx
    const [activateEffect, setActivateEffect] = useState(false)
    const [newEquip, setNewEquip] = useState()

    const EquipWeaponHandler = (id) => {
    let removedEquip = PlayerCtx.weaponSlot
    let equip = playerEquipment.filter((w) => w.id === +id)
    let equippedWeapon = equip[0]
    console.log(equippedWeapon)
    setNewEquip(equippedWeapon)
    if(removedEquip !== undefined){
        removedEquip.amount = 1
        console.log(removedEquip)
        Inventory.handleAddEquipment(removedEquip)
        setActivateEffect(true)
        
    }else{
        PlayerCtx.setWeaponSlot(equippedWeapon)
        Inventory.handleRemoveEquip('Equipped', equippedWeapon, 1)
    }
    
  
}
useEffect(() => {
    if(newEquip === undefined){

    }else {
        console.log(newEquip)
    PlayerCtx.setWeaponSlot(newEquip)
    Inventory.handleRemoveEquip('Equipped', newEquip, 1)
    setNewEquip(undefined)
    setActivateEffect(false)
    }
    
}, [activateEffect])

    const EquipShieldHandler = (id) => {
         // console.log(+id)
         let equip = playerEquipment.filter((w) => w.id === +id)
         let equippedShield = equip[0]
         // console.log(equippedShield)
         PlayerCtx.setShieldSlot(equippedShield)
    }

    const EquipHelmHandler = (id) => {
         // console.log(+id)
         let equip = playerEquipment.filter((w) => w.id === +id)
         let equippedHelm = equip[0]
         // console.log(equippedWeapon)
         PlayerCtx.setHelmSlot(equippedHelm)
    }

    const EquipArmorHandler = (id) => {
         // console.log(+id)
         let equip = playerEquipment.filter((w) => w.id === +id)
         let equippedArmor = equip[0]
         // console.log(equippedWeapon)
         PlayerCtx.setArmorSlot(equippedArmor)
    }

    const EquipAccessoryHandler = (id) => {
         // console.log(+id)
         let equip = playerEquipment.filter((w) => w.id === +id)
         let equippedAccessory = equip[0]
         // console.log(equippedWeapon)
         PlayerCtx.setAccessorySlot(equippedAccessory)
    }


  return (
    <section>
    <Backdrop />
    <ModalOverlay  handleSecondModal={handleSecondModal} weaponSlot={weaponSlot} shieldSlot={shieldSlot} helmSlot={helmSlot} armorSlot={armorSlot} accessorySlot={accessorySlot} Equipment={playerEquipment} EquipWeaponHandler={EquipWeaponHandler} EquipShieldHandler={EquipShieldHandler} EquipHelmHandler={EquipHelmHandler} EquipArmorHandler={EquipArmorHandler} EquipAccessoryHandler={EquipAccessoryHandler}/>
    
     </section>
  )
}

export default EquipModal