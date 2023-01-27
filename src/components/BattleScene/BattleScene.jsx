import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import PlayerContext from '../Store/PlayerContext'
import Button from '../Button'
import Enemies from "../../Databases/Enemies.json"
import {useNavigate} from 'react-router-dom'

const BattleScene = ({initialize, setInitialize}) => {
    
    const [playerTurn, setPlayerTurn] = useState(false)
    const [battleMessage, setBattleMessage] = useState('')
    const [enemy, setEnemy] = useState(undefined)
    const Player = useContext(PlayerContext)
    const actor = Player.Character
    const navigate = useNavigate()
    const [playerDefending, setPlayerDefending] = useState(false)
    const [enemyDefending, setEnemyDefending] = useState(false)

    useEffect(() => {
        if(initialize === true){
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
        let atk = 1 + Math.floor(Math.random() * 14)
        let def = 1 + Math.floor(Math.random() * 14)
        let agi = 1 + Math.floor(Math.random() * 14)

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
            setBattleMessage(`it is ${enemy.name}s' turn!`)
        }
    }

    useEffect(() => {
        if(enemy === undefined){
            console.log('enemy not set')
        }else {
            console.log(enemy)
            setBattleMessage(`${enemy.name} is ready to fight!`)
            determineInitiative(actor.agi, enemy.agi)
        }
    }, [enemy])

    // useEffect

const fleeCommand = () => {
    
    navigate('/Game')
    setInitialize(true)

}

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
        </div>
        <div id='player-container'>
            <div id='player-info'>
                <h1>{actor.name}</h1>
                <p>Level: {Player.level}.</p>
                <h3>{actor.hp}/{actor.maxHP}</h3>
            </div>
           {playerTurn && <div> 
            <Button type={'Fight'}/>
            <Button type={'Defend'}/>
            <Button type={'Item'}/>
            <Button className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-yellow-500 hover:bg-yellow-300 focus:translate-y-1'} onClick={() => fleeCommand()} type={'Flee'}/>
            </div>}
            <Button className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-yellow-500 hover:bg-yellow-300 focus:translate-y-1'} onClick={() => fleeCommand()} type={'Flee'}/>
        </div>
        
    </div>
  )
}

export default BattleScene