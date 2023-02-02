const items = require('./Items.json')

// console.log(items)

module.exports = {

    fight: async (req, res) =>{
        console.log(req.body)
        try{
            let defenderFlag = req.body.defending
            console.log(defenderFlag)
            if(defenderFlag === true){
                let newDef = Math.ceil(req.body.def * .25 + req.body.def)
                console.log(newDef)
                
                let damage = req.body.atk - newDef

                if(damage < 0){
                    damage = 0
                }
                console.log(damage)
                res.status(200).send(damage.toString())
            }else{
                console.log('Defender Flag False hit')
                let damage = req.body.atk - req.body.def
                if(damage < 0){
                    damage = 0
                }
                console.log(damage)
                res.status(200).send(damage.toString())
            }
        }
        catch (err) {
            console.log('An error has occured in Combat Function!', err)
        res.sendStatus(400)}
    },

    item: async (req, res) => {
        // console.log(req.body)
        try {
            let {id,pHp, pMaxHp} = req.body
        // console.log(id, pHp, pMaxHp)
        let itemUsed = items.filter((i) => i.id === id)
        console.log(itemUsed)
        if(itemUsed[0].name === 'Elixer'){
            console.log('Elixer used')
            let healing = Math.floor(pMaxHp / 2)
            if(healing + pHp > pMaxHp){
                healing = pMaxHp
            }else {
                healing = healing +pHp
            }
            return res.status(200).send(healing.toString())
        }else if(itemUsed[0].name === 'Megalixer'){
                let healing = pMaxHp
            return res.status(200).send(healing.toString())
        }else {
            let healing = itemUsed[0].amounthealed + pHp
            console.log('Else Branch Healing', healing)
            if(healing > pMaxHp){
                console.log('if branch triggered?')
                healing = pMaxHp
            }
            return res.status(200).send(healing.toString())
        }
        }
        catch (err) {
            console.log('An error has occured in the Item function!', err)
            res.sendStatus(400)
        }
    },

    result: async (req, res) => {}
}