import React, {useState, useEffect, useCallback, useContext} from 'react'
import Loot from '../DummyComponents/Loot'
import Button from '../Button'
import ShopScene from '../ShopScene/ShopScene';
import MenuModal from '../Modals/MenuModal';
import {NavLink} from 'react-router-dom'

import PlayerContext from '../Store/PlayerContext';

const GameScreen = () => {
    const [lootAccess, setLootAccess] = useState(false)
    const [showShop, setShowShop] = useState(false)
    const [displayMenu, setDisplayMenu] = useState(false)
    const [inn, setInn] = useState(false)

    const playerCtx = useContext(PlayerContext)


    const handleKeyPress = useCallback((event) => {
        if(event.key === 'q'){
        setDisplayMenu(!displayMenu)
        }
    }, [displayMenu]);

    useEffect(() => {
        // attach the event listener
        document.addEventListener('keydown', handleKeyPress);

        // remove the event listener
        return () => {
        document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

        const menuToggle = () => {
            setDisplayMenu(!displayMenu)
        }

    const displayShop = () => {
    setShowShop(!showShop)
  
    }

    const displayHandler = () => {
    setLootAccess(!lootAccess)
  
    }

        const handleInn = () => {
            setInn(true)
            playerCtx.fullHeal()
            setTimeout(() => {setInn(false)}, 5000)
        }

  return (
    <main className='game-map bg-cover'>
    <div className='flex flex-col justify-evenly items-center'>
    

        
        {displayMenu && <MenuModal menuToggle={menuToggle}/>}
        <div>
        <Button className={'fixed font-extrabold text-2xl left-1 m-5 border-8 border-double border-gray-800 bg-clip-padding w-60 h-24 rounded-lg shadow-xl bg-orange-500 hover:bg-orange-300 focus:translate-y-1'} onClick={displayHandler} type={'Show Play Test Tools'}/>
        {lootAccess && <Loot  displayHandler={displayHandler}/>}
        </div>
        <Button className={'m-5 text-2xl font-semibold fixed bottom-60 left-1/4 border-8 border-double border-gray-800 bg-clip-padding w-44 h-28 rounded-lg shadow-xl p-3 bg-blue-500 hover:bg-blue-300 focus:translate-y-1'} onClick={displayShop} type={'Visit the Shop'}/>
        {showShop && <ShopScene displayShop={displayShop}/>}
        <NavLink to={'/Battle'}><Button className={'fixed inset-y-1/3 m-5 text-3xl font-bold border-8 border-double border-gray-800 bg-clip-padding w-60 h-28 rounded-lg shadow-xl bg-red-700 hover:bg-red-300 focus:translate-y-1'} type={'Enter Battle'}/></NavLink>
       <div className='fixed right-1/4 '>
        {inn === true && <h1 className='fixed top-2 right-1/4 text-2xl font-semibold border-8 border-double p-3 bg-green-500 border-black rounded-2xl'>You rested at the Inn, you are fully healed!</h1>}
       <Button
        className={
          "fixed right-1/4 top-32 text-2xl p-3 font-semibold m-5 border-8 border-double border-gray-800 bg-clip-padding w-44 h-28 rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1"
        }
        onClick={() => handleInn()}
        type={"Rest at the Inn"}
      />
        </div>
  

    </div>

    <Button  onClick={menuToggle} className='fixed top-1 right-1 m-5 border-8 border-double border-gray-800 bg-clip-padding text-2xl font-semibold w-32 h-24 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1' type={'Menu'}/>
    </main>
  )
}

export default GameScreen