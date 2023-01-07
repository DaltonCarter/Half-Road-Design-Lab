import React, {useState, useEffect} from 'react'
import Equipment from '../../Server/Equipment.json'
import Items from '../../Server/Items.json'
import KeyItems from '../../Server/Key-Items.json'


const Database = () => {
const [equipment, setEquipment] = useState([])
const [items, setItems] = useState([])
const [keyItems, setKeyItems] = useState([])

useEffect(() => {
setEquipment(Equipment)
setItems(Items)
setKeyItems(KeyItems)
}, [])

  return (
<div>
  <h1> Complete Native Database:</h1>
     <h2>Equipment:</h2>

    <div>
    {equipment.map((equip) => (
        <div key={equip.id}>
          <br/>
          Name: {equip.name}
          <br/>
          Description: {equip.desc}
        
          </div>
          
    ))}
    </div>

      <h2>Items:</h2>

    <div>
    {items.map((item) => (
        <div key={item.id}>
          <br/>
          Name: {item.name}
          <br/>
          Description: {item.desc}
          </div>
        
    ))}
    </div>

      <h2>Key-Items:</h2>

    <div>
    {keyItems.map((kitem) => (
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

export default Database