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
        let selection = Math.floor(Math.random() * 10)
        let {name, img} = Enemies[selection]
        console.log(name, img)
        if(Player.level === 1){
        let hp = 50 + Math.floor(Math.random() * 50)
        let atk = 22 + Math.floor(Math.random() * 15)
        let def = 11 
        let agi = 8 + Math.floor(Math.random() * 10)
    

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
    }else if (Player.level > 1 && Player.level < 6){
        let hp = 70 + Math.floor(Math.random() * 100)
        let atk = 26 + Math.floor(Math.random() * 17)
        let def = 15 + Math.floor(Math.random() * 8)
        let agi = 12 + Math.floor(Math.random() * 20)

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
    } else if (Player.level > 5 && Player.level < 11){
        let hp = 100 + Math.floor(Math.random() * 120)
        let atk = 30 + Math.floor(Math.random() * 45)
        let def = 20 + Math.floor(Math.random() * 45)
        let agi = 25 + Math.floor(Math.random() * 50)

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
    }else {
        let hp = Player.totalHp + Math.floor(Math.random() * 100)
        let atk = Player.totalAtk + Math.floor(Math.random() * 20)
        let def = Player.totalDef
        let agi = Player.totalAgi + Math.floor(Math.random() * 10)

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
        
    }

    const determineInitiative = (pAgi, eAgi) => {
        if(pAgi > eAgi){
            setPlayerTurn(true)
            setBattleMessage(`It is ${actor.name}s' turn!`)
        }else {
            setPlayerTurn(false)
            setBattleMessage(`It is ${enemy.name}s' turn!`)
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
                setBattleMessage(`It is ${enemy.name}s' turn!`)
                if(enemy.hp === 0){
                    setVictory(true)
                }else {
                    let enemyActions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    const action = Math.floor(Math.random() * enemyActions.length)
                    console.log(action)
                    if(action < 8) {
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
    <div className=' bg-no-repeat Battle-Background bg-cover'>
        <div  className=' flex justify-center items-center' id='enemy-container' >
            {enemy !== undefined && <div>
                <div className='flex flex-col justify-center items-center text-center border-8 border-double border-black w-56 h-56 rounded-lg shadow-xl bg-red-500'>
                <h1 className='text-2xl font-bold underline'>{enemy.name}</h1>
                <h3 className='text-2xl font-bold underline'>Health: {enemy.hp}/{enemy.maxHp}</h3>
                <h1 className='text-2xl font-bold underline'>Atk: {enemy.atk}</h1>
                <h1 className='text-2xl font-bold underline'>Def: {enemy.def}</h1>
                <h1 className='text-2xl font-bold underline'>Agi: {enemy.agi}</h1>
                </div>
                 <img className='battler object-contain resize' src={enemy.img}/>
            </div>
}  
        </div>
        <div className='flex flex-col justify-center items-center text-center text-xl' id='battle-message'>
            {/* <p className='fixed bottom-56 left-12 right-12'>{battleMessage}</p> */}
            <br/>
            <div className='h-64 overflow-y-scroll fixed right-1 bottom-1 flex flex-col border-8 border-double border-gray-800 bg-clip-padding w-96 bg-blue-500' >{battleUpdate.map((e) => <p className='m-3' >{e}</p>)}
            <div ref={updateEndRef} />
            </div>
        </div>
        <div className='flex flex-col items-center fixed bottom-10 left-12 right-12' id='player-container'>
            <div className='bg-blue-400 border-8 border-double border-black p-4' id='player-info'>
                <h1 className='text-center text-lg font-semibold'>{actor.name}</h1>
                <p className='text-center text-lg font-semibold'>Level: {Player.level}</p>
                <h3 className='text-center text-lg font-semibold text-red-700'>Health: {actor.hp}/{pMaxHp}</h3>
            </div>
           {playerTurn && <div> 
            <Button 
                className={'m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-red-500 hover:bg-red-300 focus:translate-y-1'} 
                onClick={() => fightCommand()}
                 type={'Fight'}/>
            <Button 
            className={'m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-gray-500 hover:bg-gray-300 focus:translate-y-1'} 
            onClick={() => defendCommand()} 
            type={'Defend'}/>
            <Button 
            className={'m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1'} 
            onClick={() => setItemSelection(true)} 
            type={'Item'} />
            <Button 
            className={'m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-yellow-500 hover:bg-yellow-300 focus:translate-y-1'} 
            onClick={() => fleeCommand()} 
            type={'Flee'}/>
            </div>}
            {itemSelection && <div className=' overflow-y-scroll w-1/3 h-64 flex flex-wrap justify-around items-center fixed bottom-1 left-1 border-8 border-double border-gray-800 bg-clip-padding bg-blue-500'>
                        {playerItems.map((i) => (
                            <div className='m-2 flex flex-col items-center border-8 border-double p-5 border-black' key={i.id}>
                                <p className='m-1 font-bold text-center'>{i.name}</p>
                                <p className='m-1 italic underline'>{i.desc}</p>
                                <p className='m-1 text-center font-semibold'>Qty: {i.amount}</p>
                                <Button className=' m-1 font-bold border-8 border-double border-black w-20 h-10 bg-clip-padding rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1' onClick={() => itemCommand(i.id)} type={'Use'}/>
                            </div>
                        ))}
                        <Button className=' m-1 font-bold border-8 border-double border-black w-20 h-10 bg-clip-padding rounded-lg shadow-xl bg-red-500 hover:bg-red-300 focus:translate-y-1' onClick={() => setItemSelection(false)} type={'Close'}/>
                </div>}
                {displaySpoils === true && <Loot setInitialize={setInitialize}/>}
                {displayGameover === true && <GameoverModal setInitialize={setInitialize}/>}
        </div>
        
    </div>
  )
}

export default BattleScene