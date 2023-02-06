import { useContext, useEffect, useState } from "react";
import InventoryContext from "../Store/InventoryContext";
import PlayerContext from "../Store/PlayerContext";
import Button from "../Button";

const Backdrop = () => {
    return <div className='secondary-backdrop'/>
}

const ModalOverlay = ({ handleSecondModal, Equipment, weaponSlot, shieldSlot, helmSlot, armorSlot, accessorySlot, EquipWeaponHandler, EquipShieldHandler, EquipHelmHandler, EquipArmorHandler, EquipAccessoryHandler}) => {
    return(
        <div className='secondary-modal flex flex-col items-center'>
            <h1 className='menu-title m-5 p-3 bg-gray-300 border-8 border-double border-black'>Player Equipment:</h1>
            <div className="equip-scene flex  flex-wrap">

            <div className="flex flex-col m-3">
            <label className="m-1 text-2xl font-bold border-4 p-1 border-solid border-black bg-red-300 text-center" for='Weapon'>Weapon: </label>
            <select className="mb-2 p-2 border-4 border-solid border-black" name='weapon' id="Weapon" onChange={(e) => EquipWeaponHandler(e.target.value)}>
            <option value="" disabled selected>Select an Option</option>
                {Equipment.filter((w) => w.type === 'Weapon').map((w) => (
                    <option value={w.id}>{w.name}</option>
                ))}
            </select>
            </div>
            <div className="flex flex-col m-3">
            <label className="m-1 text-2xl font-bold border-4 p-1 border-solid border-black bg-red-300 text-center" for='Shield'>Shield: </label>
             <select className="mb-2 p-2 border-4 border-solid border-black"  name='shield' id="Shield" onChange={(e) => EquipShieldHandler(e.target.value)}>
            <option value="" disabled selected>Select an Option</option>
                {Equipment.filter((w) => w.type === 'Shield').map((w) => (
                    <option value={w.id}>{w.name}</option>
                ))}
            </select>
            </div>
            <div className="flex flex-col m-3">
            <label className="m-1 text-2xl font-bold border-4 p-1 border-solid border-black bg-red-300 text-center" for='Helm'>Helmet: </label>
             <select className="mb-2 p-2 border-4 border-solid border-black"  name='helm' id="Helm" onChange={(e) => EquipHelmHandler(e.target.value)}>
            <option value="" disabled selected>Select an Option</option>
                {Equipment.filter((w) => w.type === 'Helm').map((w) => (
                    <option value={w.id}>{w.name}</option>
                ))}
            </select>
            </div>
             <div className="flex flex-col m-3">       
            <label className="m-1 text-2xl font-bold border-4 p-1 border-solid border-black bg-red-300 text-center" for='Armor'>Armor: </label>
            <select className="mb-2 p-2 border-4 border-solid border-black"  name='Armor' id="Armor" onChange={(e) => EquipArmorHandler(e.target.value)}>
            <option value="" disabled selected>Select an Option</option>
                {Equipment.filter((w) => w.type === 'Armor').map((w) => (
                    <option value={w.id}>{w.name}</option>
                ))}
            </select>
            </div>
            <div className="flex flex-col m-3">       
            <label className="m-1 text-2xl font-bold border-4 p-1 border-solid border-black bg-red-300 text-center" for='Accessory'>Accessory: </label>
            <select className="mb-2 p-2 border-4 border-solid border-black"  name='Accessory' id="Accessory" onChange={(e) => EquipAccessoryHandler(e.target.value)}>
            <option value="" disabled selected>Select an Option</option>
                {Equipment.filter((w) => w.type === 'Accessory').map((w) => (
                    <option value={w.id}>{w.name}</option>
                ))}
            </select>
            </div>

            </div>
            <h1 className='menu-title m-5 p-3 bg-gray-300 border-8 border-double border-black'>Current Equipment:</h1>
            <div className="current-equip border-8 border-black border-double bg-blue-200 p-3">
                    <p className="text-xl font-semibold">Weapon: {weaponSlot !== undefined ? weaponSlot.name : "None"}</p>
                    <p className="text-xl font-semibold">Shield: {shieldSlot !== undefined ? shieldSlot.name : "None"}</p> 
                    <p className="text-xl font-semibold">Helmet: {helmSlot !== undefined ? helmSlot.name : "None"}</p>
                    <p className="text-xl font-semibold">Armor: {armorSlot !== undefined ? armorSlot.name : "None"}</p>
                    <p className="text-xl font-semibold">Accessory: {accessorySlot !== undefined ? accessorySlot.name : "None"}</p> 
            </div>
            <Button className={'m-3 stats-btn border-8 border-double border-black hover:bg-gray-300 focus:translate-y-1'} onClick={() => handleSecondModal('Equip')} type={'Close'}/>
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
    let calculateEquipmentValue = PlayerCtx.calculateEquipmentValue

    const EquipWeaponHandler = (id) => {
        console.log(id)
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
        calculateEquipmentValue('Attack')
    }
    
  
}
useEffect(() => {
    if(newEquip === undefined){

    }else {
        if(newEquip.type === 'Weapon'){
            console.log(newEquip)
            PlayerCtx.setWeaponSlot(newEquip)
            Inventory.handleRemoveEquip('Equipped', newEquip, 1)
            setNewEquip(undefined)
            calculateEquipmentValue('Attack')
            setActivateEffect(false)
        }else if (newEquip.type === 'Shield'){
            console.log(newEquip)
            PlayerCtx.setShieldSlot(newEquip)
            Inventory.handleRemoveEquip('Equipped', newEquip, 1)
            setNewEquip(undefined)
            calculateEquipmentValue('Defense')
            setActivateEffect(false)
        }else if (newEquip.type === 'Helm'){
            console.log(newEquip)
            PlayerCtx.setHelmSlot(newEquip)
            Inventory.handleRemoveEquip('Equipped', newEquip, 1)
            setNewEquip(undefined)
            calculateEquipmentValue('Defense')
            setActivateEffect(false)
        }else if (newEquip.type === 'Armor'){
            console.log(newEquip)
            PlayerCtx.setArmorSlot(newEquip)
            Inventory.handleRemoveEquip('Equipped', newEquip, 1)
            setNewEquip(undefined)
            calculateEquipmentValue('Defense')
            setActivateEffect(false)
        }else if (newEquip.type === 'Accessory'){
            console.log(newEquip)
            PlayerCtx.setAccessorySlot(newEquip)
            Inventory.handleRemoveEquip('Equipped', newEquip, 1)
            setNewEquip(undefined)
            calculateEquipmentValue('Defense')
            calculateEquipmentValue('Hp')
            calculateEquipmentValue('Agility')
            calculateEquipmentValue('Attack')
            setActivateEffect(false)
        }
        
    }
    
}, [activateEffect])

    const EquipShieldHandler = (id) => {
        let removedEquip = PlayerCtx.shieldSlot
        let equip = playerEquipment.filter((w) => w.id === +id)
        let equippedShield = equip[0]
        console.log(equippedShield)
        setNewEquip(equippedShield)
        if(removedEquip !== undefined){
            removedEquip.amount = 1
            console.log(removedEquip)
            Inventory.handleAddEquipment(removedEquip)
            setActivateEffect(true)
            
        }else{
            PlayerCtx.setShieldSlot(equippedShield)
            Inventory.handleRemoveEquip('Equipped', equippedShield, 1)
            calculateEquipmentValue('Defense')
        }
    }

    const EquipHelmHandler = (id) => {
        let removedEquip = PlayerCtx.helmSlot
        let equip = playerEquipment.filter((w) => w.id === +id)
        let equippedHelm = equip[0]
        console.log(equippedHelm)
        setNewEquip(equippedHelm)
        if(removedEquip !== undefined){
            removedEquip.amount = 1
            console.log(removedEquip)
            Inventory.handleAddEquipment(removedEquip)
            setActivateEffect(true)
            
        }else{
            PlayerCtx.setHelmSlot(equippedHelm)
            Inventory.handleRemoveEquip('Equipped', equippedHelm, 1)
            calculateEquipmentValue('Defense')
        }
    }

    const EquipArmorHandler = (id) => {
        console.log(id)
        let removedEquip = PlayerCtx.armorSlot
        let equip = playerEquipment.filter((w) => w.id === +id)
        let equippedArmor = equip[0]
        console.log(equip, equippedArmor)
        console.log(equippedArmor)
        setNewEquip(equippedArmor)
        if(removedEquip !== undefined){
            removedEquip.amount = 1
            console.log(removedEquip)
            Inventory.handleAddEquipment(removedEquip)
            setActivateEffect(true)
            
        }else{
            PlayerCtx.setArmorSlot(equippedArmor)
            Inventory.handleRemoveEquip('Equipped', equippedArmor, 1)
            calculateEquipmentValue('Defense')
        }
    }

    const EquipAccessoryHandler = (id) => {
        let removedEquip = PlayerCtx.accessorySlot
        let equip = playerEquipment.filter((w) => w.id === +id)
        let equippedAccessory = equip[0]
        console.log(equippedAccessory)
        setNewEquip(equippedAccessory)
        if(removedEquip !== undefined){
            removedEquip.amount = 1
            console.log(removedEquip)
            Inventory.handleAddEquipment(removedEquip)
            setActivateEffect(true)
            
        }else{
            PlayerCtx.setAccessorySlot(equippedAccessory)
            Inventory.handleRemoveEquip('Equipped', equippedAccessory, 1)
            calculateEquipmentValue('Hp')
            calculateEquipmentValue('Attack')
            calculateEquipmentValue('Defense')
            calculateEquipmentValue('Agility')
        }
    }


  return (
    <section>
    <Backdrop />
    <ModalOverlay  handleSecondModal={handleSecondModal} weaponSlot={weaponSlot} shieldSlot={shieldSlot} helmSlot={helmSlot} armorSlot={armorSlot} accessorySlot={accessorySlot} Equipment={playerEquipment} EquipWeaponHandler={EquipWeaponHandler} EquipShieldHandler={EquipShieldHandler} EquipHelmHandler={EquipHelmHandler} EquipArmorHandler={EquipArmorHandler} EquipAccessoryHandler={EquipAccessoryHandler}/>
    
     </section>
  )
}

export default EquipModal