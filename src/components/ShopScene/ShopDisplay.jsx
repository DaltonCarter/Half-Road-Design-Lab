import React, { useState, useContext } from "react";
import InventoryContext from "../Store/InventoryContext";
import Button from "../Button";



const ShopDisplay = ({
  type,
  storeItems,
  storeEquipment,
  exitHandler,
  handleItemPurchase,
  handleEquipmentPurchase,
  handleSoldEquipment,
  handleSoldItem

}) => {
  // const [quantity, setQuantity] = useState(0);
  // const [purchaseAmountDisplay, setPurchaseAmount] = useState(false)

  const inventory = useContext(InventoryContext)

  const inputHandler = (id, quantity, type) => {
    if(quantity === 0){
   
}else {
  if (type === "Equip") {
    handleEquipmentPurchase(id, quantity);

    // exitHandler();
  } else if (type === "Item") {
    handleItemPurchase(id, quantity);
    // exitHandler();
  }else if(type === "Sell Item"){
    handleSoldItem(id, quantity);
    // exitHandler();
  }else if(type === "Sell Equip"){
    handleSoldEquipment(id, quantity);
    // exitHandler();
  }
}
};

  return (
    <div className="store-container items-center flex-col ">
      <h2 className="text-3xl font-bold">Stock:</h2>
      <div className="flex flex-wrap" >
      {type === "Buy Items" &&
        storeItems.map((item) => (
          <div className="m-5 p-3 border-8 border-double border-black bg-green-200 rounded-xl" key={item.id}>
            <p className="text-lg font-semibold italic underline">Name: {item.name}</p>
            
            <p className="m-5 text-lg italic underline">Description: {item.desc}</p>
            
            <p className="text-lg m-5 font-semibold">Price: {item.price}</p>

            
            <Button
            className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1'
              type={"Buy"}
              onClick={() => inputHandler(item.id, 1, "Item")}
            />
          </div>
        ))}
        </div>
        <div className="flex flex-wrap">
      {type === "Buy Equipment" &&
        storeEquipment.map((item) => (
          <div className="m-5 p-3 border-8 border-double border-black bg-yellow-200 rounded-xl" key={item.id}>
          
           <p className="text-lg font-semibold italic underline">Name: {item.name}</p>

            <p className="m-5 text-lg italic underline">Description: {item.desc}</p>

            <p className="text-lg m-5 font-semibold">Price: {item.price}</p>

            <Button
            className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1'
              type={"Buy"}
              onClick={() => inputHandler(item.id, 1, "Equip")}
            />
          </div>
        ))}
        </div>

    <div className="flex flex-wrap">

{type === "Sell Items" &&
        inventory.playerItems.map((item) => (
          <div className="m-5 p-3 border-8 border-double border-black bg-green-200 rounded-xl" key={item.id}>
           
            <p className="text-lg font-semibold italic underline">Name: {item.name}</p>
            
            <p className="m-5 text-lg italic underline">Description: {item.desc}</p>
            
            <p className="text-lg m-5 font-semibold">Sell Price: {item.sellPrice}</p>
            
            <p className="text-lg m-5 font-semibold">Quantity Owned: {item.amount}</p>
 
            <Button
            className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1'
              type={"Sell"}
              onClick={() => inputHandler(item.id, 1, "Sell Item")}
            />
          </div>
        ))}
        </div>
        <div className="flex flex-wrap">
        {type === "Sell Equip" &&
        inventory.playerEquipment.map((equip) => (
          <div className="m-5 p-3 border-8 border-double border-black bg-yellow-200 rounded-xl" key={equip.id}>
            
            <p className="text-lg font-semibold italic underline">Name: {equip.name}</p>
            
            <p className="m-5 text-lg italic underline">Description: {equip.desc}</p>
            
            <p className="text-lg m-5 font-semibold">Sell Price: {equip.sellPrice}</p>

            <p className="text-lg m-5 font-semibold">Quantity Owned: {equip.amount}</p>

            <Button
            className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1'
              type={"Sell"}
              onClick={() => inputHandler(equip.id, 1, "Sell Equip")}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopDisplay;
