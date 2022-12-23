import {useState} from 'react'
import './App.css';
import Loot from './components/DummyComponents/Loot';
import Button from './components/Button';
import ShopScene from './components/ShopScene/ShopScene';

function App() {
const [itemInventory, setItemInventory] = useState(0)
const [equipInventory, setEquipInventory] = useState(0)
const [wallet, setWallet] = useState(0)
const [showGain, setShowGain] = useState(false)

let amount = 100
// let onHand = wallet

// const updateWallet = (amount, onHand) => {
//   let newBalance = onHand += amount
//   setWallet(newBalance) 
  
// }


const displayHandler = () => {
    setShowGain(prevShowGain => !prevShowGain)
 
}

  return (
    <div className="App">
      <h1>This is where I will be experimenting with
        the features and components I will need for this game. 
        </h1>
        <Button onClick={displayHandler} type={'Loot Button'}/>
       {showGain && <Loot amount={amount} wallet={wallet} setWallet={setWallet} itemInventory={itemInventory} setItemInventory={setItemInventory} equipInventory={equipInventory} setEquipInventory={setEquipInventory}  displayHandler={displayHandler}/>}
        <ShopScene wallet={wallet} setWallet={setWallet} itemInventory={itemInventory} setItemInventory={setItemInventory} equipInventory={equipInventory} setEquipInventory={setEquipInventory}/>
        
    </div>
  );
}

export default App;
