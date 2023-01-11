import {useState} from 'react'
import './App.css';
import Loot from './components/DummyComponents/Loot';
import Button from './components/Button';
import ShopScene from './components/ShopScene/ShopScene';
import Database from './components/DummyComponents/Database';
import InventoryDisplay from './components/InventoryDisplay/InventoryDisplay';

function App() {
const [lootAccess, setLootAccess] = useState(false)
const [showShop, setShowShop] = useState(false)




const displayShop = () => {
  setShowShop(!showShop)
  
}

const displayHandler = () => {
  setLootAccess(!lootAccess)
  
}

  return (
    <div>
    <div className="App">
      <h1>This is where I will be experimenting with
        the features and components I will need for this game. 
        </h1>

        
        <Button onClick={displayHandler} type={'Loot Button'}/>
        {lootAccess && <Loot  displayHandler={displayHandler}/>}
        <Button onClick={displayShop} type={'Store Button'}/>
        {showShop && <ShopScene displayShop={displayShop}/>}
        
    </div>

    <div className='inventory-container'>
      <Database />
      <InventoryDisplay />
      
    </div>

    </div>
  );
}

export default App;
