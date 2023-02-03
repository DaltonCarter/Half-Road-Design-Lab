import React, {useState, useEffect, useCallback, useContext} from 'react'
import Loot from '../DummyComponents/Loot'
import Button from '../Button'
import ShopScene from '../ShopScene/ShopScene';
import MenuModal from '../Modals/MenuModal';
import {NavLink} from 'react-router-dom'

import AuthContext from '../Store/authContext';

const GameScreen = () => {
    const [lootAccess, setLootAccess] = useState(false)
    const [showShop, setShowShop] = useState(false)
    const [displayMenu, setDisplayMenu] = useState(false)

    const authCtx = useContext(AuthContext)


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

  return (
    <main>
    <div className='flex flex-col justify-evenly items-center'>
    <h1>This is where I will be experimenting with
        the features and components I will need for this game. 
        </h1>

        
        {displayMenu && <MenuModal />}

        <Button className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1'} onClick={displayHandler} type={'Loot Button'}/>
        {lootAccess && <Loot  displayHandler={displayHandler}/>}
        <Button className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1'} onClick={displayShop} type={'Store Button'}/>
        {showShop && <ShopScene displayShop={displayShop}/>}
        <NavLink to={'/Battle'}><Button className={'m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1'} type={'Enter Battle'}/></NavLink>
        
        
  

    </div>

    <Button  onClick={menuToggle} className='toggle-menu-btn m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1' type={'Menu'}/>
    </main>
  )
}

export default GameScreen