import {useState, useContext} from 'react'
import axios from 'axios'
import AuthContext from '../Store/authContext'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
 
const Auth = () => {
   const [username, setUsername] = useState('')
   const [password, setPassword] = useState('')
   const [register, setRegister] = useState(true)
   const navigate = useNavigate()

   const authCtx = useContext(AuthContext)
 
   const submitHandler = e => {
       e.preventDefault()
        const body = {
            username,
            password
        }


        axios.post(register ? `/register` : `/login`, body)
            .then(({data}) => {
                console.log('AFTER AUTH', data)
                console.log(authCtx)
                authCtx.login(data.token, data.exp, data.userId)
                navigate('/Game')

                
            })
            .catch(err => {
                setPassword('')
                setUsername('')
                alert('Something has gone HORRIBLY Wrong!', err)
            })

       console.log('submitHandler called', username, password)
       setRegister(!register)
   }
 
   return (
       <main>
           <h1>Welcome!</h1>
           <form className='form auth-form' onSubmit={(e) => submitHandler(e)}>
               <input
                   className='form-input'
                   type='text' 
                   placeholder='Username'
                   onChange={(e) => setUsername(e.target.value)}/>
               <input
                   className='form-input'
                   type='text' 
                   placeholder='Password'
                   onChange={(e) => setPassword(e.target.value)}/>
               <button className='form-btn'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='form-btn' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up' }?</button>
           <Button onClick={() => navigate('/')} type={'Cancel'}/>
       </main>
   )
}
 
export default Auth