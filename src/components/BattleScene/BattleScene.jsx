import React, {useState, useEffect, useContext, useRef} from 'react'
import axios from 'axios'
import PlayerContext from '../Store/PlayerContext'
import InventoryContext from '../Store/InventoryContext'
import Button from '../Button'
import Enemies from "../../Databases/Enemies.json"
import {useNavigate} from 'react-router-dom'
import Loot from './Loot'
import GameoverModal from './GameoverModal'





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
    const [battleUpdate, setBattleUpdate] = useState(['Begin Battle Log:'])
    const [itemSelection, setItemSelection] = useState(false)
    const inventory = useContext(InventoryContext)
    const playerItems = inventory.playerItems
    const [victory, setVictory] = useState(false)
    const [gameover, setGameover] = useState(false)
    const [displaySpoils, setDisplaySpoils] = useState(false)
    const [displayGameover, setDisplayGameover] = useState(false)
    const updateEndRef = useRef(null)

    const scrollToBottom = () => {
        updateEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }
    
      useEffect(() => {
        scrollToBottom()
      }, [battleUpdate]);
    

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
        let selection = Math.floor(Math.random() * 5)
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
            setBattleUpdate([...battleUpdate, ` ${enemy.name} is ready to fight!`])
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
                if(enemy.hp === 0){
                    setVictory(true)
                }else {
                    let enemyActions = [1, 2]
                    const action = Math.floor(Math.random() * enemyActions.length)
                    console.log(action)
                    if(action === 0) {
                        let atk = enemy.atk
                        let def = pDef
                        let defending = playerDefending
                        setBattleUpdate([...battleUpdate, ` ${enemy.name} attacks!`])
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
                            if(damage > pHp){
                                actor.hp = 0
                                setGameover(true)
                            }else {
                                let adjustment = pHp - damage
                            console.log(adjustment)
                            actor.hp = adjustment
                            setBattleUpdate([...battleUpdate, ` ${enemy.name} deals ${damage} damage!`])
                            setTimeout(setBattleMessage(`It's ${actor.name}s' turn!`), 5000)
                            setTimeout(setPlayerTurn(true), 5000)
                            }
                            if(actor.hp === 0){
                                setGameover(true)
                            }
                             
                        })
                            .catch((err) => console.log('Error in damage return!!', err))
                        
                    } else {
                        setEnemyDefending(true)
                        setBattleUpdate([...battleUpdate, ` ${enemy.name} raises it's guard!`])
                        setTimeout(setBattleMessage(`It's ${actor.name}s' turn!`), 5000)
                        setTimeout(setPlayerTurn(true), 5000)
                    }
                }
               
                
    
            }
        }
       
    }, [playerTurn])

const fightCommand = async () => {
    
    let def = enemy.def
    let atk = pAtk
    let defending = enemyDefending
    setBattleUpdate([...battleUpdate, ` ${actor.name} attacks!`])
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
        if(damage > eHp){
            enemy.hp = 0
            setVictory(true)
        }else {
            let adjustment = eHp - damage
            console.log(adjustment)
    
            enemy.hp = adjustment
            setBattleUpdate([...battleUpdate, ` ${actor.name} deals ${damage} damage!`])
            setTimeout(setPlayerTurn(false), 5000)
        }
        
        
         })
        .catch((err) => console.log('Error in damage return!!', err))

    
}

const defendCommand = () => {
    setBattleUpdate([...battleUpdate, ` ${actor.name} raises their guard!`])
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
            if(usedItem.name === 'Elixer'){
                setBattleUpdate([...battleUpdate, ` ${actor.name} uses a ${usedItem.name} and heals ${usedItem.amounthealed}% Hp!`])
            }else if(usedItem.name === 'Megalixer'){
                setBattleUpdate([...battleUpdate, ` ${actor.name} uses a ${usedItem.name} and heals ${usedItem.amounthealed}% Hp!`])
            }else {
                setBattleUpdate([...battleUpdate, ` ${actor.name} uses a ${usedItem.name} and heals ${usedItem.amounthealed} Hp!`])
            }
            
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


useEffect(() => {
    if(victory === false){

    }else {
        setPlayerTurn(undefined)
        setDisplaySpoils(true)
    }

    if(gameover === false){

    }else {
        setPlayerTurn(undefined)
        setDisplayGameover(true)
    }
}, [victory, gameover])


// End of Battle Result handling ^^^^^^^^^^^^^^^^
  return (
    <div>
         
        <div className=' bg-no-repeat bg-auto Battle-Background bg-cover'  id='enemy-container'>
            {enemy !== undefined && <div>
                <div className='flex flex-col justify-center items-center text-center border-8 border-double border-gray-800 bg-clip-padding w-36 h-32 rounded-lg shadow-xl bg-red-500'>
                <h1>{enemy.name}</h1>
                <h3>{enemy.hp}/{enemy.maxHp}</h3>
                </div>
                {enemy.name === 'Chaos' ? <img className=' h-2/4 fixed inset-x-1/3 inset-y-72' src={enemy.img}/> : enemy.name === 'Bahamut'? <img className='h-3/4 fixed inset-x-1/3 inset-y-1' src={enemy.img}/> : <img className='h-28 fixed inset-x-2/4 inset-y-2/3' src={enemy.img}/>}
            </div>
}  
        </div>
        <div className='flex flex-col justify-center items-center text-center' id='battle-message'>
            <p>{battleMessage}</p>
            <br/>
            <div className='h-64 overflow-y-scroll fixed right-96 bottom-1 flex flex-col border-8 border-double border-gray-800 bg-clip-padding w-96 bg-blue-500' >{battleUpdate.map((e) => <p>{e}</p>)}
            <div ref={updateEndRef} />
            </div>
        </div>
        <div className='flex flex-col justify-center items-center' id='player-container'>
            <div id='player-info'>
                <h1 className='text-center'>{actor.name}</h1>
                <p className='text-center'>Level: {Player.level}</p>
                <h3 className='text-center'>Health: {actor.hp}/{pMaxHp}</h3>
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
            {itemSelection && <div className=' w-1/3 h-64 flex flex-wrap justify-around items-center fixed bottom-1 left-1 border-8 border-double border-gray-800 bg-clip-padding bg-blue-500'>
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
                {displaySpoils === true && <Loot setInitialize={setInitialize}/>}
                {displayGameover === true && <GameoverModal setInitialize={setInitialize}/>}
        </div>
        
    </div>
  )
}

export default BattleScene