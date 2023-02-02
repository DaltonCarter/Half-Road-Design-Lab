import React, { useState, useContext, useEffect } from "react";
import Button from "../Button";
import Equipment from "../../Databases/Equipment.json";
import Items from "../../Databases/Items.json";
import InventoryContext from "../Store/InventoryContext";
import PlayerContext from "../Store/PlayerContext";
import { useNavigate } from "react-router-dom";

const Backdrop = () => {
  return <div className='loot-backdrop'/>
}

const ModalOverlay = ({exitHandler, exp, xal, item, equipment}) => {
  
  return(
      <div className='loot-modal'>
          <h1>Rewards for your Victory!</h1>
          <p>{exp} Experience!</p>
          <p>{xal} Xal!</p>
          {item === undefined ? <p>Nothing was obtained this time.</p> : <p>You recieved x{item.amount} {item.name}</p>}
          {equipment === undefined ? <p>Nothing was obtained this time.</p> : <p>You recieved x{equipment.amount} {equipment.name}</p>}
          <Button className={'stats-btn'} onClick={() => exitHandler()} type={'Close'}/>
      </div>
  )
}

function Loot({setInitialize}) {
  const inventory = useContext(InventoryContext);
  const playerCtx = useContext(PlayerContext);
  let [exp, setExp] = useState(0)
  let [xal, setXal] = useState(0)
  let [item, setItem] = useState(undefined)
  let [equipment, setEquipment] = useState(undefined)
  let navigate = useNavigate()
  
  const randomMoney = () => {
    let amount = Math.floor(Math.random() * 1000);
    inventory.handleWallet(amount, "Increase");
    setXal(amount)
  };

  const randomItem = () => {
    const itemDrop = Math.floor(Math.random() * 5);
    if (itemDrop > 0) {
      const item = Items[Math.floor(Math.random() * Items.length)];
      console.log(item);
      item.amount = 1;
      inventory.handleAddConsumable(item);
      setItem(item)
    } else {
      console.log("You get NOTHING~")
      
      
    }
  };

  const randomEquipment = () => {
    const equipDrop = Math.floor(Math.random() * 6);
    console.log(equipDrop);
    if (equipDrop > 0) {
      const equip = Equipment[Math.floor(Math.random() * Equipment.length)];
      equip.amount = 1;

      console.log(equip);
      inventory.handleAddEquipment(equip);
      setEquipment(equip)
    } else {
      console.log("You get NOTHING~");
    }
  };

  const gainExp = () => {
    console.log(playerCtx.currentExp);
    let currentXp = playerCtx.currentExp;
    let randomXp = Math.floor(Math.random() * 500);
    let newXp = currentXp + randomXp;
    console.log(newXp);
    playerCtx.setCurrentExp(newXp);
    setExp(newXp)
  };

useEffect(() => {
gainExp()
randomMoney()
randomItem()
randomEquipment()
}, [])

const exitHandler = () => {
  setInitialize(true)
  navigate('/Game')

}

  return (
    <div >
      <Backdrop />
      <ModalOverlay exp={exp} xal={xal} item={item} equipment={equipment} exitHandler={exitHandler}/>
    </div>
  );
}

export default Loot;
