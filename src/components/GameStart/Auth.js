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
                navigate('/Load')

                
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
       <main className='flex flex-col w-full justify-center items-center parchment-bg bg-cover'>
           <h1 className=' border-8 border-double border-black text-6xl p-5 m-5 font-extrabold italic underline'>Welcome to the Colosseum!</h1>
           <h2 className='text-3xl m-5 font-bold italic'> Please pick a unique Username, and a Password.</h2>
           <form className='flex flex-col items-center' onSubmit={(e) => submitHandler(e)}>
               <input
                   className='border-8 border-double border-black bg-clip-padding  m-5 text-xl italic w-60 h-14'
                   type='text' 
                   placeholder='Username'
                   onChange={(e) => setUsername(e.target.value)}/>
               <input
                   className='border-8 border-double border-black bg-clip-padding  m-5 text-xl italic w-60 h-14'
                   type='password' 
                   placeholder='Password'
                   onChange={(e) => setPassword(e.target.value)}/>
               <button className='m-5 font-bold border-8 border-double border-black w-36 h-14 bg-clip-padding rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1'>
                   {register ? 'Sign Up' : 'Login'}
               </button>
           </form>
           <button className='m-5 font-bold border-8 border-double border-black w-40 h-14 bg-clip-padding rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1' onClick={() => setRegister(!register)}>Need to {register ? 'Login' : 'Sign Up' }?</button>
           <Button className='m-5 font-bold border-8 border-double border-black w-36 h-14 bg-clip-padding rounded-lg shadow-xl bg-red-500 hover:bg-red-300 focus:translate-y-1' onClick={() => navigate('/')} type={'Cancel'}/>
       </main>
   )
}
 
export default Auth