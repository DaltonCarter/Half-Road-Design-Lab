import {useState, useEffect, useCallback, useContext} from 'react'
import './App.css';
import Loot from './components/DummyComponents/Loot';
import Button from './components/Button';
import ShopScene from './components/ShopScene/ShopScene';
import Database from './components/DummyComponents/Database';
import MenuModal from './components/Modals/MenuModal';
import PlayerContext from './components/Store/PlayerContext';

function App() {
const [lootAccess, setLootAccess] = useState(false)
const [showShop, setShowShop] = useState(false)
const [displayMenu, setDisplayMenu] = useState(false)
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


const displayShop = () => {
  setShowShop(!showShop)
  
}

const displayHandler = () => {
  setLootAccess(!lootAccess)
  
}

// const {hp, atk, def, agi} = playerCtx.Character
// console.log("This should be the character object, and values", hp, atk, def, agi, playerCtx.Character)

  return (
    <div>
    <div className="App">
      <h1>This is where I will be experimenting with
        the features and components I will need for this game. 
        </h1>

        
        {displayMenu && <MenuModal />}

        <Button onClick={displayHandler} type={'Loot Button'}/>
        {lootAccess && <Loot  displayHandler={displayHandler}/>}
        <Button onClick={displayShop} type={'Store Button'}/>
        {showShop && <ShopScene displayShop={displayShop}/>}
        
  

    </div>

    <div className='inventory-container'>
      <Database />
      {/* <InventoryDisplay /> */}
      
    </div>

    </div>
  );
}

export default App;
