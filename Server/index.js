const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())













app.listen(8202, () => console.log(`Adun Toridas, we have synced with the DB, and we are listening on port 8202.`))