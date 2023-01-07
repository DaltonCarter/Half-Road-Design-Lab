console.log('Dark Templar: Adun Toridas, from the shadows I come!')

const express = require('express')
const app = express()

app.use(express.json())
const {handleWallet, handleAddConsumable, handleAddEquipment, handleAddKeyItem} = require( './InventoryManager')

.post('/wallet', handleWallet)

app.listen(3000, () =>{
    console.log('Server is online at port 3000')
    console.log('What would you ask of us?')
})