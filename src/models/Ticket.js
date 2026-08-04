const {DataTypes}= require('sequelize');
const db = require('../config/db');

module.exports= db.define('Ticket',{
    codigo:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    descripcion:{
        type: DataTypes.STRING(200),
    }
}, {tableName: 'tickets', timestamps:false});
