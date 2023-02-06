import React from 'react'
import Button from '../Button'
import {NavLink} from 'react-router-dom'

const TitlePage = () => {

  return (
    <main className='flex flex-col justify-evenly items-center title bg-cover'>
    <div className='text-6xl font-extrabold m-5 italic underline'> Seinira: The Khadran Colosseum</div>
    <br/>
    <NavLink to={"/Start"}><Button className={'m-5 font-bold border-8 border-double border-gray-800  w-40 h-16 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1'} type={"Start Game"}/></NavLink>
    <NavLink to={"/About"}><Button className={'m-5 border-8 font-bold border-double border-gray-800  w-40 h-16 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1'} type={"About"}/></NavLink>
    <NavLink to={"/Credits"}><Button className={'m-5 font-bold border-8 border-double border-gray-800  w-40 h-16 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1'} type={"Credits"}/></NavLink>
    <NavLink to={"/Auth"}><Button className={'m-5 font-bold border-8 border-double border-gray-800  w-40 h-16 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1'} type={"Sign Up/Login"}/></NavLink>
    
    



        <footer className='font-bold text-xl p-5 font-bold border-8 border-double border-black bg-yellow-300'>Ver: 0.0.5 (Alpha)  Copyright 2023 Half-Road Design Lab</footer>
    </main>
  )
}

export default TitlePage