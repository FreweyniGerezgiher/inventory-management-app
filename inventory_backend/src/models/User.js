const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const User = sequelize.define("users", {

    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    name:{
        type:DataTypes.STRING,
        allowNull:false
    },

    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    }

},{
    timestamps:true
});


module.exports = User;