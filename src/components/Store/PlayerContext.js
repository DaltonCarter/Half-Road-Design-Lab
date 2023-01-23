import {createContext, useState, useEffect} from 'react'
import Player from '../../Server/Player.json'



const PlayerContext = createContext({
    Character: {},
    weaponSlot: null,
    shieldSlot: null,
    helmSlot: null,
    armorSlot: null,
    accessorySlot: null,
    nextLevel: 0,
    currentExp: 0,
    level: 0,
    setWeaponSlot: () => {},
    setShieldSlot: () => {},
    setHelmSlot: () => {},
    setArmorSlot: () => {},
    setAccessorySlot: () => {},
    setCurrentExp: () => {},
    fullHeal: () => {}

})

export const PlayerContextProvider = (props) => {
    const baseStats = Player[0]
    const [Character, setCharacter] = useState(baseStats)
    const [weaponSlot, setWeaponSlot] = useState()
    const [shieldSlot, setShieldSlot] = useState()
    const [helmSlot, setHelmSlot] = useState()
    const [armorSlot, setArmorSlot] = useState()
    const [accessorySlot, setAccessorySlot] = useState()
    const [nextLevel, setNextLevel] = useState(100)
    const [currentExp, setCurrentExp] = useState(0)
    const [level, setLevel] = useState(1)
    



useEffect(() => {
    checkExp()
}, [currentExp])

const checkExp = () => {
    if(currentExp >= nextLevel){
        // console.log(Character)
        let newLevel = level + 1
        let newCurrentXP = currentExp - nextLevel
        let newNextLevel = nextLevel + 100 + Math.floor(Math.random() * 200)
        let hpUp = Math.floor(Math.random() * 30)
        let atkUp = Math.floor(Math.random() * 10)
        let defUp = Math.floor(Math.random() * 10)
        let agiUp = Math.floor(Math.random() * 10)
        let updatedCharacter = Character
        console.log(updatedCharacter, hpUp, atkUp, defUp, agiUp)
        updatedCharacter = {...Character, maxHP: Character.maxHP + hpUp, atk: Character.atk + atkUp, def: Character.def + defUp, agi: Character.agi + agiUp }
        
        console.log(updatedCharacter)

        setCurrentExp(newCurrentXP)
        setNextLevel(newNextLevel)
        setLevel(newLevel)
        setCharacter(updatedCharacter)
    }
}

const fullHeal = () => {
    console.log('begin heal') 
    let player = {...Character, hp: Character.maxHP}
    console.log('Should be healed')
    setCharacter(player)
}


let contextValue = {
   Character,
   weaponSlot,
   shieldSlot,
   helmSlot,
   armorSlot,
   accessorySlot,
   nextLevel,
   currentExp,
   level,
   setWeaponSlot,
   setShieldSlot,
   setHelmSlot,
   setArmorSlot,
   setAccessorySlot,
   setCurrentExp,
   fullHeal

}





    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContext