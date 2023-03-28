import {createContext, useState, useEffect} from 'react'
import Player from '../../Databases/Player.json'



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
    totalHp: 0,
    totalAtk: 0,
    totalDef: 0,
    totalAgi: 0,
    levelUp: null,
    setWeaponSlot: () => {},
    setShieldSlot: () => {},
    setHelmSlot: () => {},
    setArmorSlot: () => {},
    setAccessorySlot: () => {},
    setCurrentExp: () => {},
    fullHeal: () => {},
    calculateEquipmentValue: () => {},
    setCharacter: () => {},
    setLevel: () => {},
    setCurrentExp: () => {},
    setNextLevel: () => {},
    setLevelUp: () => {}
    

})

export const PlayerContextProvider = (props) => {
    const baseStats = Player[0]
    const [Character, setCharacter] = useState(baseStats)
    const [weaponSlot, setWeaponSlot] = useState({
        "id": 1,
        "type": "Weapon",
        "name": "Short Sword",
        "atkPwr": 5,
        "price": 200,
        "sellPrice": 100,
        "amount": 0,
        "desc": "A simple short sword, made so that even the untrained can use it."
        })
    const [shieldSlot, setShieldSlot] = useState({
        "id": 3,
        "type": "Shield",
        "name": "Buckler",
        "defPwr": 3,
        "price": 200,
        "sellPrice": 100,
        "amount": 0,
        "desc": "A small easy to use shield."
    })
    const [helmSlot, setHelmSlot] = useState({
        "id": 4,
        "type": "Helm",
        "name": "Leather Helmet",
        "defPwr": 2,
        "price": 100,
        "sellPrice": 50,
        "amount": 0,
        "desc": "A light helmet made from tanned leather."
    })
    const [armorSlot, setArmorSlot] = useState({
        "id": 5,
        "type": "Armor",
        "name": "Leather Armor",
        "defPwr": 5,
        "price": 200,
        "sellPrice": 100,
        "amount": 0,
        "desc": "A suit of light armor made from tanned leather."
    })
    const [accessorySlot, setAccessorySlot] = useState( {
        "id": 6,
        "type": "Accessory",
        "name": "Charm",
        "hp": 10,
        "atkPwr": 2,
        "defPwr": 0,
        "agi": 2,
        "price": 200,
        "sellPrice": 100,
        "amount": 0,
        "desc": "A strange necklace that supposedly helps protect the wearer."
    })
    const [nextLevel, setNextLevel] = useState(100)
    const [currentExp, setCurrentExp] = useState(0)
    const [level, setLevel] = useState(1)
    const [totalHp, setTotalHp] = useState(0)
    const [totalAtk, setTotalAtk] = useState(0)
    const [totalDef, setTotalDef] = useState(0)
    const [totalAgi, setTotalAgi] = useState(0)
    const [levelUp, setLevelUp] = useState(false)
    
    



useEffect(() => {
    checkExp()
    
}, [currentExp])

const checkExp = () => {
    if(currentExp >= nextLevel){
        setLevelUp(true)
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
        calculateEquipmentValue('Hp')
        calculateEquipmentValue('Attack')
        calculateEquipmentValue('Defense')
        calculateEquipmentValue('Agility')
    }
}


const fullHeal = () => {
    console.log('begin heal') 
    let player = {...Character, hp: totalHp}
    console.log('Should be healed')
    setCharacter(player)
}

const calculateEquipmentValue = (type) => {
    if(type === 'Hp'){
        if(accessorySlot !== undefined){
            let total = accessorySlot.hp
            let trueTotal = total + Character.maxHP
            setTotalHp(trueTotal)
            return total
        }else {
            let total = 0
            setTotalHp(Character.maxHP)
            return total
        }
    }else if(type ==='Attack') {
        if(weaponSlot !== undefined){
            if(accessorySlot !== undefined){
                console.log('weapon + accessory hit')
                console.log(accessorySlot, weaponSlot)
                let total = weaponSlot.atkPwr + accessorySlot.atkPwr
                let trueTotal = total + Character.atk
                setTotalAtk(trueTotal)
                return total
            }else {
                console.log('only weapon hit')
                let total = weaponSlot.atkPwr
                let trueTotal = total + Character.atk
                setTotalAtk(trueTotal)
            return total
            }
        }else {
            console.log('else branch hit')
            let total = 0
            setTotalAtk(Character.atk)
            return total
        }

    }else if(type === 'Defense'){
        let shieldValue = 0
        let helmValue = 0
        let armorValue = 0
        let accessoryValue = 0
        if(shieldSlot !== undefined){
            shieldValue = shieldSlot.defPwr
        }
        if(helmSlot !== undefined){
            helmValue = helmSlot.defPwr
        }
        if(armorSlot !== undefined){
            armorValue = armorSlot.defPwr
        }
        if(accessorySlot !== undefined){
            accessoryValue = accessorySlot.defPwr
        }

        let total = shieldValue + helmValue + armorValue + accessoryValue
        let trueTotal = total + Character.def
        setTotalDef(trueTotal)
        return total
        
    }else if(type === 'Agility'){
        if(accessorySlot !== undefined){
            let total = accessorySlot.agi
            let trueTotal = total + Character.agi
            setTotalAgi(trueTotal)
            return total
        }else {
            let total = 0
            setTotalAgi(Character.agi)
            return total
        }
    }
}

console.log(totalHp, totalAtk, totalDef, totalAgi)


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
   totalHp,
   totalAtk,
   totalDef,
   totalAgi,
   levelUp,
   setWeaponSlot,
   setShieldSlot,
   setHelmSlot,
   setArmorSlot,
   setAccessorySlot,
   setCurrentExp,
   fullHeal,
   calculateEquipmentValue,
   setCharacter,
   setLevel,
   setCurrentExp,
   setNextLevel,
   setLevelUp
   

}





    return(
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContext