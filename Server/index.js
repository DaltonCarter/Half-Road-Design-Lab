const express = require('express')
const cors = require('cors')

const {fight, item} = require('./Controllers/battleSystem')

const app = express()

app.use(express.json())
app.use(cors())


app.post('/fight', fight)
app.post('/item', item)










app.listen(8202, () => console.log(`Adun Toridas, we have synced with the DB, and we are listening on port 8202.`))