const { View_History } = require('../../app/models')
const {Sequelize} = require("sequelize");

const createNewViewService = async (view) => {
    return await View_History.create(view)
}


module.exports = { createNewViewService };


