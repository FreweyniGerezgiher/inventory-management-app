const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");


const Transaction=sequelize.define("transactions",{

id:{
 type:DataTypes.INTEGER,
 autoIncrement:true,
 primaryKey:true
},


productId:{
 type:DataTypes.INTEGER,
 allowNull:false
},


type:{
 type:DataTypes.STRING,
 allowNull:false
},


amount:{
 type:DataTypes.INTEGER,
 allowNull:false
},


oldQuantity:{
 type:DataTypes.INTEGER
},


newQuantity:{
 type:DataTypes.INTEGER
}


},{
timestamps:true
});


module.exports=Transaction;