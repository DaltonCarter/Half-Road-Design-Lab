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
    let calculateEquipmentValue = PlayerCtx.calculateEquipmentValue
    

    
   

  return (
    <section>
    <Backdrop />
    <ModalOverlay handleSecondModal={handleSecondModal} character={character} level={level} exp={exp} nextLevel={nextLevel}  calculateEquipmentValue={calculateEquipmentValue}/>
    
     </section>
  )
}

export default StatsModal