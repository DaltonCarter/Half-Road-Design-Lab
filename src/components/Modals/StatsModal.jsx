import React, {useContext} from 'react'
import PlayerContext from '../Store/PlayerContext'
import Button from '../Button'

const Backdrop = () => {
    return <div className='secondary-backdrop'/>
}

const ModalOverlay = ({handleSecondModal, character, level, nextLevel, exp, weapon, shield, helm, armor, accessory, calculateEquipmentValue}) => {
    const noEquip = 0
    

    

    return(
        <div className='secondary-modal'>
            <h1 className='menu-title'>Character Information:</h1>
            <section className='stat-display'>
            <table>
                <thead>
                    <tr>
                <th colSpan='4'>Character Stats:</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Name:</td>
                    <td>{character.name}</td>
                </tr>
                <tr>
                    <td>Level:</td>
                    <td>{level}</td>
                </tr>
                <tr>
                    <td>Current Experience:</td>
                    <td>{exp}</td>
                    <td>To Next Level:</td>
                    <td>{nextLevel}</td>
                </tr>
                </tbody>
            </table>
            <table>
                <thead>
                    <tr>
                <th colSpan='4'>Attributes:</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Name:</td>
                    <td>Base Value:</td>
                    <td>Equipment Value:</td>
                    <td>Total Value:</td>
                </tr>
                <tr>
                    <td>HP:</td>
                    <td>{character.hp}/{character.maxHP}</td>
                    <td>{calculateEquipmentValue('Hp')}</td>
                    <td>{character.maxHP + calculateEquipmentValue('Hp')}</td>

                </tr>
                <tr>
                    <td>Attack:</td>
                    <td>{character.atk}</td>
                    <td>{calculateEquipmentValue('Attack')}</td>
                    <td>{character.atk + calculateEquipmentValue('Attack')}</td>

                </tr>
                <tr>
                    <td>Defense:</td>
                    <td>{character.def}</td>
                    <td>{calculateEquipmentValue('Defense')}</td>
                    <td>{character.def + calculateEquipmentValue('Defense')}</td>

                </tr>
                <tr>
                    <td>Agility:</td>
                    <td>{character.agi}</td>
                    <td>{calculateEquipmentValue('Agility')}</td>
                    <td>{character.agi + calculateEquipmentValue('Agility')}</td>

                </tr>
                </tbody>
            </table>
            </section>
            
            <Button className={'stats-btn'} onClick={() => handleSecondModal('Stats')} type={'Close'}/>
        </div>
    )
}

const StatsModal = ({handleSecondModal}) => {
    const PlayerCtx = useContext(PlayerContext)

    let character = PlayerCtx.Character
    let level = PlayerCtx.level
    let exp = PlayerCtx.currentExp
    let nextLevel = PlayerCtx.nextLevel
    

    
    const calculateEquipmentValue = (type) => {
        if(type === 'Hp'){
            if(PlayerCtx.accessorySlot !== undefined){
                let total = PlayerCtx.accessorySlot.hp
                return total
            }else {
                let total = 0
                return total
            }
        }else if(type ==='Attack') {
            if(PlayerCtx.weaponSlot !== undefined){
                if(PlayerCtx.accessorySlot !== undefined){
                    console.log('weapon + accessory hit')
                    console.log(PlayerCtx.accessorySlot, PlayerCtx.weaponSlot)
                    let total = PlayerCtx.weaponSlot.atkPwr + PlayerCtx.accessorySlot.atkPwr
                    return total
                }else {
                    console.log('only weapon hit')
                    let total = PlayerCtx.weaponSlot.atkPwr
                return total
                }
            }else {
                console.log('else branch hit')
                let total = 0
                return total
            }

        }else if(type === 'Defense'){
            let shieldValue = 0
            let helmValue = 0
            let armorValue = 0
            let accessoryValue = 0
            if(PlayerCtx.shieldSlot !== undefined){
                shieldValue = PlayerCtx.shieldSlot.defPwr
            }
            if(PlayerCtx.helmSlot !== undefined){
                helmValue = PlayerCtx.helmSlot.defPwr
            }
            if(PlayerCtx.armorSlot !== undefined){
                armorValue = PlayerCtx.armorSlot.defPwr
            }
            if(PlayerCtx.accessorySlot !== undefined){
                accessoryValue = PlayerCtx.accessorySlot.defPwr
            }

            let total = shieldValue + helmValue + armorValue + accessoryValue

            return total
            
        }else if(type === 'Agility'){
            if(PlayerCtx.accessorySlot !== undefined){
                let total = PlayerCtx.accessorySlot.agi
                return total
            }else {
                let total = 0
                return total
            }
        }
    }

  return (
    <section>
    <Backdrop />
    <ModalOverlay handleSecondModal={handleSecondModal} character={character} level={level} exp={exp} nextLevel={nextLevel}  calculateEquipmentValue={calculateEquipmentValue}/>
    
     </section>
  )
}

export default StatsModal