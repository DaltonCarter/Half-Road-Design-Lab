import {useState} from 'react'
import './App.css';
import Loot from './components/DummyComponents/Loot';
import Button from './components/Button';
import ShopScene from './components/ShopScene/ShopScene';
import Database from './components/DummyComponents/Database';
import Equipment from './Server/Equipment.json'
import Items from './Server/Items.json'
import KeyItems from './Server/Key-Items.json'
import InventoryFunnel from './components/DummyMIddleMan/InventoryFunnel';

function App() {
const [lootAccess, setLootAccess] = useState(false)




const displayHandler = () => {
  if(lootAccess === true){
    setLootAccess(false)
  }else {
    setLootAccess(true)
  }
  
}

  return (
    <div>
    <div className="App">
      <h1>This is where I will be experimenting with
        the features and components I will need for this game. 
        </h1>

        
        <Button onClick={displayHandler} type={'Loot Button'}/>
        {lootAccess && <InventoryFunnel  displayHandler={displayHandler}/>}
        {/* <ShopScene wallet={wallet} setWallet={setWallet} itemInventory={itemInventory} setItemInventory={setItemInventory} equipInventory={equipInventory} setEquipInventory={setEquipInventory}/> */}
        
    </div>

    <div className='inventory-container'>
      <Database />
      {/* <PlayerInventory wallet={0} playerEquipment={[]} playerItems={[]} playerKeyItems={[]}/> */}
      
    </div>

    </div>
  );
}

export default App;
