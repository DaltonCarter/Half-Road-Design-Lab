import React from 'react'
import Button from '../Button'
import {NavLink} from 'react-router-dom'

const About = () => {
  return (
    <div className='flex flex-col justify-evenly items-center  parchment-bg bg-cover'>
        

        <h2 className='border-8 border-double border-black p-2 bg-clip-padding bg-yellow-100  text-4xl m-5 font-bold'>Technologies Used:</h2>

            <div className='border-8 border-double border-black bg-clip-padding bg-yellow-100 flex justify-around items-center'>

            <img alt='React.js' className='w-20 m-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" />
          
            <img alt='Node.js' className='w-32 m-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original-wordmark.svg" />

            <img alt='JavaScript' className='w-20 m-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />
          
            <img alt='CSS3' className='w-20 m-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original-wordmark.svg" />

            <img alt='Tailwind Css' className='w-40 m-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" />

            <img alt='Express.js' className='w-36 m-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original-wordmark.svg" />

            <img alt='Sequelize'  className='w-36 m-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original-wordmark.svg" />
          
            <img alt='Postgres SQL'  className='w-20 m-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" />
          
            <img alt='Adobe Photoshop' className='w-20 m-5' src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-line.svg" />
          
          
            </div>
            <h1 className='text-4xl font-extrabold m-5'>About This Game:</h1>
        <h3 className='border-8 border-double border-black text-2xl p-2 font-bold m-5'>First and foremost this game is a Work in progress. 
            The game as it appears currently is it's most basic 
            incarnation.
            </h3>
            <br/>
            <p className='italic text-xl font-semibold m-5 text-center'>
            Current Features:
            <br/>
            - Single Screen "Hub" area, where player can access the Store, initiate Combat, rest, 
            and access the menu. Display will be a backgroud image with Clearly labled 
            objects to interact with.
            <br/>
            - Fully interactive menu scene, where players can view their Inventory,
            See Character Stats, Equip weapons and armor, and quit the game.
            <br/>
            - Shop where players can buy and sell Items
            and Equipmment. **Currently can only buy/sell one thing at a time.
            <br/>
            - Game Navigation is currently point and click or key bound, if you aren't in combat
            then you are on the "Hub" screen where you can access everything you need.
            <br/>
            - Front View Battle System: Features a battle background, as well as static enemy sprite.
            User display will show name, Level, and HP/max Hp, user input limited to: Fight, Defend, Item, and Flee for now.
            <br/> 
            - Players can create a Login which will allow them to save and load their progress. Registering only requires
            a username, NO DUPLICATES, and a password. <br/>Load feature will display up to 6 of the users most recent saves,
            which they can load or delete. ATTENTION: It is currently up to THE USER to keep track/ manage their saves if they choose to have more than one run.
            <br/> 
            </p>
            <p className='italic text-xl font-semibold m-5 text-center'>
            Planned Features:
                <br/>
            - Animated Enemy sprites, attack animations
                <br/>
            - Shop where you can buy/sell in bulk.
                <br/>
            - Spells, Skills, Status Effects and Magic Stats
                <br/>
            - World Expansion, mission based fields and dungeons.
                <br/>
            - A Plot, actual story content.
                <br/>
            - 3 character Party
                <br/>
            - Character Classes
                <br/>
            - Expanded Items, Equipment, and Key-Items
                <br/>
            </p>
            <h3 className='border-8 border-double border-black text-2xl font-bold p-2 m-5 text-red-800'>NOTE:
                The Planned Features list does not represent the order in which these features might appear. Actual implementation
                will be dependant on how easily I can figure out, modify, and make the code.</h3>
                
                
                <NavLink to='/'><Button className={'border-8 font-bold border-double border-black w-28 h-11 rounded-lg shadow-xl bg-white hover:bg-yellow-200 focus:translate-y-1'} type={'Return'}/></NavLink>
    </div>
  )
}

export default About