import React, {useState, useContext} from 'react'
import axios from 'axios'
import InventoryContext from '../Store/InventoryContext'

const InventoryDisplay = ({type}) => {
  let inventory = useContext(InventoryContext)

  return (
  <div>
{type === 'Items' && <div className='inventory'>
<h2 className='inventory-title'>Items:</h2>
<div className='inventory-display-container'>
{inventory.playerItems.map((item) => (
<div className='inventory-card' key={item.id}>
  Name: {item.name}
  <br/>
  Description: {item.desc}
  <br/>
  Number Owned: {item.amount}
  </div>

))}
</div>
  </div> || type === 'Equip' && <div className='inventory'>
  <h2 className='inventory-title'>Equipment:</h2>
  <div className='inventory-display-container'>
  {inventory.playerEquipment.map((equip) => (
    <div className='inventory-card' key={equip.id}>
      Name: {equip.name}
      <br/>
      Description: {equip.desc}
      <br/>
      Number Owned: {equip.amount}
    
      </div>
      
))}
</div>
  </div> || type === 'Key Items' && <div className='inventory'>
  <h2 className='inventory-title'>Key-Items:</h2>
  <div className='inventory-display-container'>
  {inventory.playerKeyItems.map((kitem) => (
    <div className='inventory-card' key={kitem.id}>
      Name: {kitem.name}
      <br/>
      Description: {kitem.desc}
      </div>
))}
</div>
  </div>}

  </div>

  )

 

}

export default InventoryDisplay