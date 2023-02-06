import React, { useState, useContext } from "react";
import InventoryContext from "../Store/InventoryContext";
import Items from "../../Databases/Items.json";
import Equipment from "../../Databases/Equipment.json";
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
        setBuyEquipment(false)
      }
    } else if (type === "Equip") {
      if (inventory.wallet === 0) {
        setShopText("You have no money!");

        setTimeout(() => setShopText("What would you like to buy?"), 2000);
      } else {
        setBuyEquipment(true);
        setBuyItems(false)
      }
    } else if (type === "S-Items") {
      if (inventory.playerItems === []) {
      
        setShopText('You have nothing to sell!')
        
        setTimeout(() => setShopText("What would you like to sell?"), 2000);
      } else {
        setSellItems(true);
        setSellEquipment(false)
      }
    } else if (type === "S-Equip") {
      if (inventory.playerEquipment === []) {
        setShopText("You have nothing to sell!");

        setTimeout(() => setShopText("What would you like to sell?"), 2000);
      } else {
        console.log('ping')
        setSellEquipment(true);
        setSellItems(false)
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
    clickHandler("Close")
    
  }

  return (
    <div className="flex flex-col p-5 items-center shop-scene border-8 border-double border-black rounded-lg z-50 bg-blue-700 w-full  bg-opacity-90">
      <h1 className="text-3xl font-bold border-b-4 border-black italic">Welcome to our Shop!</h1>

      <div className="flex flex-col items-center">
        <p className="m-5 text-xl font-semibold">{shopText}</p>
        <br />
        <p className="text-xl font-semibold">Your Funds: {inventory.wallet} Xal</p>
        <br />
        {!buy && !sell && (
          <Button className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-gray-500 hover:bg-gray-300 focus:translate-y-1' onClick={() => clickHandler("Buy")} type="buy" />
        )}
        {buy && <Button className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1' onClick={() => clickHandler("Items")} type={"Items"} />}
        {buy && <Button className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-yellow-500 hover:bg-yellow-300 focus:translate-y-1' onClick={() => clickHandler("Equip")} type={"Equip"} />}
        {buy && <Button className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-red-500 hover:bg-red-300 focus:translate-y-1' onClick={() => exitHandler()} type={"Close"} />}
        {!sell && !buy && (
          <Button className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-gray-500 hover:bg-gray-300 focus:translate-y-1' onClick={() => clickHandler("Sell")} type={"sell"} />
        )}
        {sell && (
          <Button className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-green-500 hover:bg-green-300 focus:translate-y-1' onClick={() => clickHandler("S-Items")} type={"S-Items"} />
        )}
        {sell && (
          <Button className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-yellow-500 hover:bg-yellow-300 focus:translate-y-1' onClick={() => clickHandler("S-Equip")} type={"S-Equip"} />
        )}
        {sell && (
          <Button className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-red-500 hover:bg-red-300 focus:translate-y-1' onClick={() => exitHandler()} type={"Close"} />
        )}
        {!buy && !sell && (
          <Button className='m-5 font-bold border-8 border-double border-gray-800 bg-clip-padding w-28 h-11 rounded-lg shadow-xl bg-red-500 hover:bg-red-300 focus:translate-y-1' onClick={() => displayShop()} type={"Close"} />
        )}
      </div>

      <div className="inventory-display overflow-y-scroll">
      
        {buyItems && <ShopDisplay exitHandler={exitHandler} storeItems={storeItems} type={'Buy Items'} handleItemPurchase={handleItemPurchase}/>}
        {buyEquipment && <ShopDisplay exitHandler={exitHandler} storeEquipment={storeEquipment} type={'Buy Equipment'} handleEquipmentPurchase={handleEquipmentPurchase}/>}
        {sellItems && <ShopDisplay  exitHandler={exitHandler} type={'Sell Items'} handleSoldItem={handleSoldItem}/>}
        {sellEquipment && <ShopDisplay exitHandler={exitHandler} type={'Sell Equip'} handleSoldEquipment={handleSoldEquipment}/>}
      </div>
    </div>
  );
}

export default ShopScene;
