import React, {useState,} from 'react'
import axios from 'axios'

const InventoryDisplay = ({wallet, playerEquipment, playerItems, playerKeyItems}) => {


  return (
  <div>
    <h1>Player Inventory:</h1>

    <h2>Wallet:</h2>
    <div>{wallet} Xal</div>

    <h2>Equipment:</h2>
      <div>
      <div>
    {playerEquipment.map((equip) => (
        <div key={equip.id}>
          <br/>
          Name: {equip.name}
          <br/>
          Description: {equip.desc}
          <br/>
          Number Owned: {equip.amount}
        
          </div>
          
    ))}
    </div>

    <h2>Items:</h2>

<div>
  {playerItems.map((item) => (
    <div key={item.id}>
      <br/>
      Name: {item.name}
      <br/>
      Description: {item.desc}
      <br/>
      Number Owned: {item.amount}
      </div>
    
))}
</div>

      </div>

      <h2>Key-Items:</h2>

    <div>
    {playerKeyItems.map((kitem) => (
        <div key={kitem.id}>
          <br/>
          Name: {kitem.name}
          <br/>
          Description: {kitem.desc}
          </div>
    ))}
    </div>
  </div>
    )



 

}

export default InventoryDisplay