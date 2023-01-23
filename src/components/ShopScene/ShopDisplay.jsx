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
  const [quantity, setQuantity] = useState(0);

  const inventory = useContext(InventoryContext)

  const inputHandler = (id, quantity, type) => {
    if (type === "Equip") {
      handleEquipmentPurchase(id, quantity);
  
      exitHandler();
    } else if (type === "Item") {
      handleItemPurchase(id, quantity);
      // exitHandler();
    }else if(type === "Sell Item"){
      handleSoldItem(id, quantity);
      exitHandler();
    }else if(type === "Sell Equip"){
      handleSoldEquipment(id, quantity);
      exitHandler();
    }
  };

  return (
    <div className="store-container">
      {type === "Buy Items" &&
        storeItems.map((item) => (
          <div key={item.id}>
            <br />
            Name: {item.name}
            <br />
            Description: {item.desc}
            <br />
            Price: {item.price}
            <br />
            Quantity:{" "}
            <input
              id="store-input"
              type="number"
              min="0"
              max="99"
              onChange={(e) => {setQuantity(e.target.value)}}
              placeholder={0}
            />
            <br />
            <Button
              type={"Buy"}
              onClick={(e) => {
                e.target.value=0
                inputHandler(item.id, quantity, "Item")}}
            />
          </div>
        ))}

      {type === "Buy Equipment" &&
        storeEquipment.map((item) => (
          <div key={item.id}>
            <br />
            Name: {item.name}
            <br />
            Description: {item.desc}
            <br />
            Price: {item.price}
            <br />
            Quantity:{" "}
            <input
            id="store-input"
              type="number"
              min="0"
              max="99"
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={0}
            />
            <br />
            <Button
              type={"Buy"}
              onClick={() => inputHandler(item.id, quantity, "Equip")}
            />
          </div>
        ))}

{type === "Sell Items" &&
        inventory.playerItems.map((item) => (
          <div key={item.id}>
            <br />
            Name: {item.name}
            <br />
            Description: {item.desc}
            <br />
            Sell Price: {item.sellPrice}
            <br />
            Possessed: {item.amount}
            <br />
            Quantity:{" "}
            <input
            id="store-input"
              type="number"
              min="0"
              max={item.amount}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={0}
            />
            <br />
            <Button
              type={"Sell"}
              onClick={() => inputHandler(item.id, quantity, "Sell Item")}
            />
          </div>
        ))}

        {type === "Sell Equip" &&
        inventory.playerEquipment.map((equip) => (
          <div key={equip.id}>
            <br />
            Name: {equip.name}
            <br />
            Description: {equip.desc}
            <br />
            Sell Price: {equip.sellPrice}
            <br />
            Quantity:{" "}
            <input
            id="store-input"
              type="number"
              min="0"
              max={equip.amount}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder={0}
            />
            <br />
            <Button
              type={"Sell"}
              onClick={() => inputHandler(equip.id, quantity, "Sell Equip")}
            />
          </div>
        ))}

    </div>
  );
};

export default ShopDisplay;
