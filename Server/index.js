require(`dotenv`).config()

const express = require('express')
const cors = require('cors')

const {SERVER_PORT} = process.env
const {fight, item} = require('./Controllers/battleSystem')
const {register, login} = require('./Controllers/auth')
const {isAuthenticated} = require('./Middleware/isAuthenticated')
const {save, load, getSaveFiles, deleteSave} = require('./Controllers/SaveGame')
const {sequelize} = require('./Util/database')
const {User} = require('./Models/users')
const {SaveFile} = require('./Models/SaveFile')

const app = express()

app.use(express.json())
app.use(cors())

User.hasMany(SaveFile)
SaveFile.belongsTo(User)

app.post('/register', register)
app.post('/login', login)

app.get('/loadScreen/:userId', getSaveFiles)
app.post('/save', save)
app.get('/load/:id', load)
app.delete('/delete/:id', deleteSave)

app.post('/fight', fight)
app.post('/item', item)










sequelize.sync()
// sequelize.sync({force: true})
    .then(() => {
        app.listen(SERVER_PORT, () => console.log(`Adun Toridas, we have synced with the DB, and we are listening on port ${SERVER_PORT}`))
    })
    .catch(err => console.log(err))