import React, {useContext} from 'react'
import PlayerContext from '../Store/PlayerContext'
import Button from '../Button'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../Store/authContext'

const Backdrop = () => {
    return <div className='gameover-backdrop gameover bg-cover bg-repeat-round'/>
}

const ModalOverlay = ({exitHandler}) => {
    

    return(
        <div className='gameover-modal flex justify-center items-center '>
            
            <Button className='font-bold border-8 border-double border-black rounded-lg bg-clip-padding fixed bottom-72 inset-x-2/4 bg-purple-700 shadow-xl hover:bg-purple-500 focus:translate-y-1 text-3xl font-bold w-40 h-20' onClick={() => exitHandler()} type={"Quit"}/>
        </div>
    )
}

const GameoverModal = ({setInitialize}) => {  
    const player = useContext(PlayerContext)
    const navigate = useNavigate() 
    const authCtx = useContext(AuthContext)
    const exitHandler = () => {
        player.Character.hp = player.Character.maxHP
        if(authCtx.token){
            navigate('/Load')
        }else {
        setInitialize(true)
        navigate('/')
        setTimeout(() => {window.location.reload()}, 500)
    }
    }

  return (
    <section>
    <Backdrop />
    <ModalOverlay exitHandler={exitHandler}/>
    
     </section>
  )
}

export default GameoverModal