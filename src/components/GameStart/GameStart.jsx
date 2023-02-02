import React, {useContext} from 'react'
import AuthContext from '../Store/authContext'
import { useNavigate } from 'react-router-dom'

const GameStart = () => {
    authCtx = useContext(AuthContext)
  return (
    <div>GameStart</div>
  )
}

export default GameStart