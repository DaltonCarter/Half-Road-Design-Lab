import React, { useState, useContext } from "react";
import InventoryContext from "../Store/InventoryContext";
import Items from "../../Server/Items.json";
import Equipment from "../../Server/Equipment.json";
import Button from "../Button";
import ShopDisplay from "./ShopDisplay";

function ShopScene({ displayShop }) {
  const [buy, setBuy] = useState(false);
  const [buyItems, setBuyItems] = useState(false);
  const [buyEquipment, setBuyEquipment] = useState(false);
  const [sell, setSell] = useState(false);
  const [sellItems, setSellItems] = useState(false);
  const [sellEquipment, setSellEquipment] = useState(false);
  const [shopText, setShopText] = useState("What will you be doing today?");

  const inventory = useContext(InventoryContext);

  const storeEquipment = [...Equipment];
  const storeItems = [...Items];

  const clickHandler = (type) => {
    if (type === "Buy") {
      setBuy((prevBuy) => !prevBuy);
      console.log("Go Ahead TACCOM.");
      setShopText("What would you like to buy?");
    } else if (type === "Sell") {
      setSell((prevSell) => !prevSell);
      console.log("Confirmed.");
      setShopText("What would you like to sell?");
    } else if (type === "Items") {
      if (inventory.wallet === 0) {
        console.log("You have no money!");
        setShopText("You have no money!");
        setTimeout(() => setShopText("What would you like to buy?"), 2000);
      } else {
        setBuyItems(true);
      }
    } else if (type === "Equip") {
      if (inventory.wallet === 0) {
        setShopText("You have no money!");

        setTimeout(() => setShopText("What would you like to buy?"), 2000);
      } else {
        setBuyEquipment(true);
      }
    } else if (type === "S-Items") {
      if (inventory.playerItems === []) {
      
        setShopText('You have nothing to sell!')
        
        setTimeout(() => setShopText("What would you like to sell?"), 2000);
      } else {
        setSellItems(true);
      }
    } else if (type === "S-Equip") {
      if (inventory.playerEquipment === []) {
        setShopText("You have nothing to sell!");

        setTimeout(() => setShopText("What would you like to sell?"), 2000);
      } else {
        console.log('ping')
        setSellEquipment(true);
      }
    } else if (type === "Close" && buy === true) {
      setBuy((prevBuy) => !prevBuy);
      setShopText("What will you be doing today?");
    } else if (type === "Close" && sell === true) {
      setSell((prevSell) => !prevSell);
      setShopText("What will you be doing today?");
    }
  };

  const handleItemPurchase = (id, amount) => {
    
    console.log(id, amount)
    const Item = Items.findIndex((item) => item.id === id)
    const purchasedItem = Items[Item]
    purchasedItem.amount = +amount
    console.log(purchasedItem)

    

    const purchaseTotal = purchasedItem.price * +amount
    if(purchaseTotal > inventory.wallet){
      setShopText("You do not have enough money.")
      setTimeout(() => setShopText("What would you like to buy?"), 2000)
    }else {
      console.log(purchasedItem)
      setShopText('Thank You!')
      inventory.handleWallet(purchaseTotal, 'Decrease')
      inventory.handleAddConsumable(purchasedItem)
      setTimeout(() => setShopText("What would you like to buy?"), 2000);
    }

    
  };

  const handleEquipmentPurchase = (id, amount) => {
    console.log(id, amount)
    const Equip = Equipment.findIndex((item) => item.id === id)
    const purchasedEquip = Equipment[Equip]
    purchasedEquip.amount = +amount
    console.log(purchasedEquip)

    

    const purchaseTotal = purchasedEquip.price * +amount
    if(purchaseTotal > inventory.wallet){
      setShopText("You do not have enough money.")
      setTimeout(() => setShopText("What would you like to buy?"), 2000)
    }else {
      console.log(purchasedEquip)
      setShopText('Thank You!')
      inventory.handleWallet(purchaseTotal, 'Decrease')
      inventory.handleAddEquipment(purchasedEquip)
      setTimeout(() => setShopText("What would you like to buy?"), 2000);
    }
  };

  const handleSoldItem = (id, amount) => {
    console.log(id, amount)
    const Item = inventory.playerItems.findIndex((item) => item.id === id)
    const modifiedItem = inventory.playerItems[Item]

    const sellTotal = modifiedItem.sellPrice * +amount
    inventory.handleWallet(sellTotal, 'Increase')
    // console.log(inventory.playerItems[Item].amount)
    if(inventory.playerItems[Item].amount === +amount){
      console.log('ping')
      setShopText('Pleasure doing business with you!')
      inventory.handleRemoveItem( 'remove', modifiedItem)
      setTimeout(() => setShopText("What would you like to sell?"), 2000);
    }else {
      setShopText('Pleasure doing business with you!')
      inventory.handleRemoveItem('modify', modifiedItem, amount)
      setTimeout(() => setShopText("What would you like to sell?"), 2000);
    }

    
  };

  const handleSoldEquipment = (id, amount) => {
    console.log(id, amount)
    const equip = inventory.playerEquipment.findIndex((item) => item.id === id)
    const modifiedEquip = inventory.playerEquipment[equip]

    const sellTotal = modifiedEquip.sellPrice * +amount
    inventory.handleWallet(sellTotal, 'Increase')
    // console.log(inventory.playerEquipment[Item].amount)
    if(inventory.playerEquipment[equip].amount === +amount){
      console.log('ping')
      setShopText('Pleasure doing business with you!')
      inventory.handleRemoveEquip( 'remove', modifiedEquip)
      setTimeout(() => setShopText("What would you like to sell?"), 2000);
    }else {
      setShopText('Pleasure doing business with you!')
      inventory.handleRemoveEquip('modify', modifiedEquip, amount)
      setTimeout(() => setShopText("What would you like to sell?"), 2000);
    }

  };
  
  const exitHandler = () => {
    setBuyEquipment(false)
    setSellEquipment(false)
    setBuyItems(false)
    setSellItems(false)
    
  }

  return (
    <div className="shop-scene">
      <p>Welcome to our Shop!</p>

      <div>
        {shopText}
        <br />
        Your Funds: {inventory.wallet} Xal
        <br />
        {!buy && !sell && (
          <Button onClick={() => clickHandler("Buy")} type="buy" />
        )}
        {buy && <Button onClick={() => clickHandler("Items")} type={"Items"} />}
        {buy && <Button onClick={() => clickHandler("Equip")} type={"Equip"} />}
        {buy && <Button onClick={() => clickHandler("Close")} type={"Close"} />}
        {!sell && !buy && (
          <Button onClick={() => clickHandler("Sell")} type={"sell"} />
        )}
        {sell && (
          <Button onClick={() => clickHandler("S-Items")} type={"S-Items"} />
        )}
        {sell && (
          <Button onClick={() => clickHandler("S-Equip")} type={"S-Equip"} />
        )}
        {sell && (
          <Button onClick={() => clickHandler("Close")} type={"Close"} />
        )}
        {!buy && !sell && (
          <Button onClick={() => displayShop()} type={"Close"} />
        )}
      </div>

      <div className="inventory-display">
      <h2>Stock:</h2>
        {buyItems && <ShopDisplay exitHandler={exitHandler} storeItems={storeItems} type={'Buy Items'} handleItemPurchase={handleItemPurchase}/>}
        {buyEquipment && <ShopDisplay exitHandler={exitHandler} storeEquipment={storeEquipment} type={'Buy Equipment'} handleEquipmentPurchase={handleEquipmentPurchase}/>}
        {sellItems && <ShopDisplay  exitHandler={exitHandler} type={'Sell Items'} handleSoldItem={handleSoldItem}/>}
        {sellEquipment && <ShopDisplay exitHandler={exitHandler} type={'Sell Equip'} handleSoldEquipment={handleSoldEquipment}/>}
      </div>
    </div>
  );
}

export default ShopScene;
