import React, {useContext} from 'react'
import PlayerContext from '../Store/PlayerContext'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'

const Backdrop = () => {
    return <div className='gameover-backdrop'/>
}

const ModalOverlay = ({exitHandler}) => {
    

    return(
        <div className='gameover-modal'>
            <h1>GAMEOVER!</h1>
            <Button onClick={() => exitHandler()} type={"Quit"}/>
        </div>
    )
}

const GameoverModal = ({setInitialize}) => {  
    const player = useContext(PlayerContext)
    const navigate = useNavigate() 
    const exitHandler = () => {
        player.Character.hp = player.Character.maxHP
        setInitialize(true)
        navigate('/')
    }

  return (
    <section>
    <Backdrop />
    <ModalOverlay exitHandler={exitHandler}/>
    
     </section>
  )
}

export default GameoverModal