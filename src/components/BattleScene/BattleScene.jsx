import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import PlayerContext from '../Store/PlayerContext'
import InventoryContext from '../Store/InventoryContext'
import Button from '../Button'
import Enemies from "../../Databases/Enemies.json"
import {useNavigate} from 'react-router-dom'


const BattleScene = ({initialize, setInitialize}) => {
    
    const [playerTurn, setPlayerTurn] = useState(undefined)
    const [battleMessage, setBattleMessage] = useState('')
    const [enemy, setEnemy] = useState(undefined)
    const Player = useContext(PlayerContext)
    const actor = Player.Character
    const navigate = useNavigate()
    const [playerDefending, setPlayerDefending] = useState(false)
    const [enemyDefending, setEnemyDefending] = useState(false)
    let pAtk = Player.totalAtk
    let pDef = Player.totalDef
    let pMaxHp = Player.totalHp
    const [battleUpdate, setBattleUpdate] = useState('')
    const [battleResult, setBattleResult] = useState('')
    const [itemSelection, setItemSelection] = useState(false)
    const inventory = useContext(InventoryContext)
    const playerItems = inventory.playerItems

//Battle initialization vvvvvvvvvvvvvvvvvv

    useEffect(() => {
        if(initialize === true){
            Player.calculateEquipmentValue('Hp')
            Player.calculateEquipmentValue('Attack')
            Player.calculateEquipmentValue('Defense')
            Player.calculateEquipmentValue('Agility')
            setInitialize(false)
            generateEnemy()
        

        }else {
            console.log(initialize)
        }
        
    }, [initialize])

    const generateEnemy = () => {
        let selection = Math.floor(Math.random() * 4)
        let {name, img} = Enemies[selection]
        console.log(name, img)
        let hp = 25 + Math.floor(Math.random() * 100)
        let atk = 6 + Math.floor(Math.random() * 15)
        let def = 5 + Math.floor(Math.random() * 6)
        let agi = 5 + Math.floor(Math.random() * 10)

        let opponent = {
            name: name,
            img: img,
            hp: hp,
            maxHp: hp,
            atk: atk,
            def: def,
            agi: agi
        }

        setEnemy(opponent)
    }

    const determineInitiative = (pAgi, eAgi) => {
        if(pAgi > eAgi){
            setPlayerTurn(true)
            setBattleMessage(`it is ${actor.name}s' turn!`)
        }else {
            setPlayerTurn(false)
            setBattleMessage(`it is ${enemy.name}s' turn!`)
        }
    }

    useEffect(() => {
        if(enemy === undefined){
            console.log('enemy not set')
        }else {
            console.log(enemy)
            setBattleUpdate(`${enemy.name} is ready to fight!`)
            determineInitiative(actor.agi, enemy.agi)
        }
    }, [enemy])

//End of Battle initialization ^^^^^^^^^^^^^^^^


//Start Turn Handling vvvvvvvvvv

    useEffect( () => {
        if(enemy === undefined){

        }else {
            if(playerTurn === false){
                setBattleMessage(`it is ${enemy.name}s' turn!`)
                let enemyActions = [1, 2]
                const action = Math.floor(Math.random() * enemyActions.length)
                console.log(action)
                if(action === 0) {
                    let atk = enemy.atk
                    let def = pDef
                    let defending = playerDefending
                    setBattleUpdate(`${enemy.name} attacks!`)
                    let body = {
                        defending,
                        def,
                        atk    
                    }

                     axios.post('/fight', body)
                        .then((res) => {console.log(res.data)
                        setPlayerDefending(false)
                        let pHp = actor.hp
                        let damage = res.data
                        // console.log(eHp, damage)
                        let adjustment = pHp - damage
                        console.log(adjustment)
                        actor.hp = adjustment
                        setBattleUpdate(`${enemy.name} deals ${damage} damage!`)
                        setTimeout(setBattleMessage(`It's ${actor.name}s' turn!`), 5000)
                        setTimeout(setPlayerTurn(true), 5000)
                         
                    })
                        .catch((err) => console.log('Error in damage return!!', err))
                    
                } else {
                    setEnemyDefending(true)
                    setBattleUpdate(`${enemy.name} raises it's guard!`)
                    setTimeout(setBattleMessage(`It's ${actor.name}s' turn!`), 5000)
                    setTimeout(setPlayerTurn(true), 5000)
                }
                
    
            }
        }
       
    }, [playerTurn])

const fightCommand = async () => {
    
    let def = enemy.def
    let atk = pAtk
    let defending = enemyDefending
    setBattleUpdate(`${actor.name} attacks!`)
    let body = {
        defending,
        atk,
        def
    }

   await axios.post('/fight', body)
        .then((res) => {console.log(res.data)
        setEnemyDefending(false)
        let eHp = enemy.hp
        let damage = res.data
        // console.log(eHp, damage)
        let adjustment = eHp - damage
        console.log(adjustment)
        enemy.hp = adjustment
        setBattleUpdate(`${actor.name} deals ${damage} damage!`)
        setTimeout(setPlayerTurn(false), 5000)
         })
        .catch((err) => console.log('Error in damage return!!', err))

    
}

const defendCommand = () => {
    setBattleUpdate(`${actor.name} raises their guard!`)
    setPlayerDefending(true)
    setTimeout(setPlayerTurn(false), 5000)
}

const itemCommand = async (id) => {
    console.log(id)
    let item = inventory.playerItems.filter((i) => i.id === id)
    let usedItem = item[0]
    let pHp = actor.hp
    let body = {
        id,
        pHp,
        pMaxHp
    }
    setItemSelection(false)
    await axios.post('/item', body)
        .then((res) => {
            // console.log(res.data)
            let healedAmount = res.data
            // console.log(healedAmount)
            actor.hp = healedAmount
            // console.log(actor.hp)
            if(usedItem.amount > 1){
                inventory.handleRemoveItem('modify', usedItem, 1)
            }else {
                inventory.handleRemoveItem('remove', usedItem, 1)
            }
            
            setBattleUpdate(`${actor.name} heals!`)
            setTimeout(setPlayerTurn(false), 5000)
        })
        .catch((err) => console.log('Error in Item Healing return!!', err))
}

const fleeCommand = () => {
    
    navigate('/Game')
    setInitialize(true)

}


//End of Turn handling ^^^^^^^^^^^^^^^^^^

// Battle result handling vvvvvvvvvvv

// End of Battle Result handling ^^^^^^^^^^^^^^^^
  return (
    <div id='Battle-back'>
        <div id='enemy-container'>
            {enemy !== undefined && <div>
                <img src={enemy.img}/>
                <h1>{enemy.name}</h1>
                <h3>{enemy.hp}/{enemy.maxHp}</h3>
            </div>
}
            
        </div>
        <div id='battle-message'>
            {battleMessage}
            <br/>
            {battleUpdate}
        </div>
        <div id='player-container'>
            <div id='player-info'>
                <h1>{actor.name}</h1>
                <p>Level: {Player.level}.</p>
                <h3>Health: {actor.hp}/{pMaxHp}</h3>
            </div>
           {playerTurn && <div> 
            <Button 
                className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-red-500 hover:bg-red-300 focus:translate-y-1'} 
                onClick={() => fightCommand()}
                 type={'Fight'}/>
            <Button 
            className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-gray-500 hover:bg-gray-300 focus:translate-y-1'} 
            onClick={() => defendCommand()} 
            type={'Defend'}/>
            <Button 
            className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1'} 
            onClick={() => setItemSelection(true)} 
            type={'Item'} />
            <Button 
            className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-yellow-500 hover:bg-yellow-300 focus:translate-y-1'} 
            onClick={() => fleeCommand()} 
            type={'Flee'}/>
            </div>}
            {itemSelection && <div>
                        {playerItems.map((i) => (
                            <div key={i.id}>
                                <p>{i.name}</p>
                                <p>{i.desc}</p>
                                <p>Qty: {i.amount}</p>
                                <Button onClick={() => itemCommand(i.id)} type={'Use'}/>
                            </div>
                        ))}
                        <Button onClick={() => setItemSelection(false)} type={'Close'}/>
                </div>}
            {/* <Button className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-yellow-500 hover:bg-yellow-300 focus:translate-y-1'} onClick={() => fleeCommand()} type={'Flee'}/> */}
        </div>
        
    </div>
  )
}

export default BattleScene