require(`dotenv`).config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const {SECRET} = process.env
const {User} = require('../Models/users')

const createToken = (username, id) => {
    return newToken = jwt.sign({username, id}, SECRET, {expiresIn: "2 days"})
}

module.exports  = {
    login: async (req, res) => {
        try{
            const {username, password} = req.body
            let foundUser = await User.findOne({where: {username}})
            if(foundUser){
                const isAuthenticated = bcrypt.compareSync(password, foundUser.hashedPass)
                if(isAuthenticated){
                    const token = createToken(foundUser.dataValues.username, foundUser.dataValues.id)
                    console.log('HA-TOOOOKEN!', token)
                    const exp = Date.now() + 1000 * 60 * 60 * 48
                res.status(200).send({
                    username: foundUser.dataValues.username,
                    userId: foundUser.dataValues.id,
                    token,
                    exp
                })
                }else {
                    res.status(400).send('Cannot log in!')
                }
            } else {
                res.status(400).send('User does not exist!.')
            }
        }
        catch (err) {
            console.log('We have encountered the enemy!')
            console.log(err)
            res.sendStatus(400)
        }
    },

    register: async (req, res) => {
        try { 
            const {username, password} = req.body
            let existingUser = await User.findOne({where: {username}})
            if(existingUser){
                res.status(400).send('That username is already taken. Please choose another.')
            } else {
                const salt = bcrypt.genSaltSync(10)
                const hash = bcrypt.hashSync(password, salt)
                const newUser = await User.create({username, hashedPass: hash})
                const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
                console.log('HA-TOOOOKEN!', token)
                const exp = Date.now() + 1000 * 60 * 60 * 48
            res.status(201).send({
                username: newUser.dataValues.username,
                userId: newUser.dataValues.id,
                token,
                exp
            })           }
        }
        catch{(err) => console.log(err)}
    },
}