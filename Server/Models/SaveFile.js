const {DataTypes} = require('sequelize')

const {sequelize} = require('../Util/database')

module.exports = {
    SaveFile : sequelize.define('saveFile', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        characterData: DataTypes.JSON,
        level: DataTypes.INTEGER,
        currentExp: DataTypes.INTEGER,
        nextLevel: DataTypes.INTEGER,
        weapon: DataTypes.INTEGER,
        shield: DataTypes.INTEGER,
        helm: DataTypes.INTEGER,
        armor: DataTypes.INTEGER,
        accessory: DataTypes.INTEGER,
        items: DataTypes.JSON,
        equipment: DataTypes.JSON,
        keyItems: DataTypes.JSON,
        wallet: DataTypes.INTEGER

    
    })
}