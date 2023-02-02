
const {SaveFile} = require('../Models/SaveFile')

module.exports = {
    getSaveFiles: async (req, res) => {
        console.log('Attempting to retrieve Save Files.')
        try{
            console.log(req.params)
            const {userId} = req.params
            console.log(userId)
            const saveFiles = await SaveFile.findAll({
                where: {userId: +userId},
                order: [['id', 'DESC']],
                limit: 2
            })
            // console.log(saveFiles)
            res.status(200).send(saveFiles)
            
        }
        catch{}
    },

    save: async (req, res) => {
        console.log('Attempting to Save.')
        try{
            const {userId, character, level, currentExp, nextLevel, weapon, shield, helm, armor, accessory, items, equipment, keyItems, wallet } = req.body
                console.log(userId, character, level, currentExp, nextLevel, weapon, shield, helm, armor, accessory, items, equipment, keyItems, wallet)
                await SaveFile.create({userId, characterData: JSON.stringify(character), level, currentExp, nextLevel, weapon, shield, helm, armor, accessory, items: JSON.stringify(items), equipment: JSON.stringify(equipment), keyItems: JSON.stringify(keyItems), wallet})
                res.sendStatus(201)
        }
        catch (err) {
            console.log('Error Saving Game!')
            console.log(err)
            res.sendStatus(400)
        }
    },
    load: async (req, res) => {
        console.log('Retrieving save data!')
        try{
            const {id} = req.params
            const file = await  SaveFile.findOne({
                where: {id: +id}
            })
            console.log(file)
            res.status(200).send(file)
        }
        catch (err) {
            console.log('Error in loading save!')
            console.log(err)
            res.sendStatus(400)
        }
    },

    deleteSave: async (req,  res) => {
        console.log('Attempting to delete Save...')
        try{
            const {id} = req.params
            await SaveFile.destroy({where: {id: +id}})
            res.sendStatus(200)
        }
        catch (err) {
            console.log('Error in deleteing save!')
            console.log(err)
            res.sendStatus(400)
        }
    }
    
}