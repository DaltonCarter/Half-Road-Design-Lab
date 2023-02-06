import React, { useContext } from "react";
import Button from "../Button";
import Equipment from "../../Databases/Equipment.json";
import Items from "../../Databases/Items.json";
import KeyItems from "../../Databases/Key-Items.json";
import InventoryContext from "../Store/InventoryContext";
import PlayerContext from "../Store/PlayerContext";

function Loot({ displayHandler }) {
  const inventory = useContext(InventoryContext);
  const playerCtx = useContext(PlayerContext);

  const randomMoney = () => {
    let amount = Math.floor(Math.random() * 1000);
    inventory.handleWallet(amount, "Increase");
  };

  const randomItem = () => {
    const itemDrop = Math.floor(Math.random() * 5);
    if (itemDrop > 0) {
      const item = Items[Math.floor(Math.random() * Items.length)];
      console.log(item);
      item.amount = 1;
      inventory.handleAddConsumable(item);
    } else {
      console.log("You get NOTHING~");
    }
  };

  const randomEquipment = () => {
    const equipDrop = Math.floor(Math.random() * 25);
    console.log(equipDrop);
    if (equipDrop > 0) {
      const equip = Equipment[Math.floor(Math.random() * Equipment.length)];
      equip.amount = 1;

      console.log(equip);
      inventory.handleAddEquipment(equip);
    } else {
      console.log("You get NOTHING~");
    }
  };

  const randomKeyItem = () => {
    let drop = KeyItems
    let keyItem = drop[0]
    console.log(keyItem)
    inventory.handleAddKeyItem(keyItem)
  };

  const gainExp = () => {
    console.log(playerCtx.currentExp);
    let currentXp = playerCtx.currentExp;
    let randomXp = Math.floor(Math.random() * 500);
    let newXp = currentXp + randomXp;
    console.log(newXp);
    playerCtx.setCurrentExp(newXp);
  };

  return (
    <div className="money-gain-modal flex flex-col items-center fixed p-6 left-1 top-36 border-8 border-double border-black bg-green-500">
      <h1 className="text-2xl font-semibold italic underline">Debugging Menu: 
        </h1>
      <Button
        className={
          "m-5 border-8 border-double border-gray-800 bg-clip-padding w-36 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1"
        }
        onClick={() => randomMoney()}
        type={"Money Button"}
      />
      <Button
        className={
          "m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1"
        }
        onClick={() => randomItem()}
        type={"Item Button"}
      />
      <Button
        className={
          "m-5 border-8 border-double border-gray-800 bg-clip-padding w-40 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1"
        }
        onClick={() => randomEquipment()}
        type={"Equipment Button"}
      />
      <Button className={
          "m-5 border-8 border-double border-gray-800 bg-clip-padding w-40 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1"
        } onClick={() => randomKeyItem()} type={'Key-Item Button'}/>
      <Button
        className={
          "m-5 border-8 border-double border-gray-800 bg-clip-padding w-40 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1"
        }
        onClick={() => gainExp()}
        type={"Experience Button"}
      />
      <Button
        className={
          "m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1"
        }
        onClick={() => playerCtx.fullHeal()}
        type={"Heal"}
      />
      <Button
        className={
          "m-5 border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-blue-500 hover:bg-blue-300 focus:translate-y-1"
        }
        onClick={displayHandler}
        type={"Close"}
      />
    </div>
  );
}

export default Loot;
