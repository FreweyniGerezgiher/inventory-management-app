const {DataTypes}=require("sequelize");
const sequelize=require("../config/database");


const Product=sequelize.define("products",{

id:{
 type:DataTypes.INTEGER,
 autoIncrement:true,
 primaryKey:true
},


sku:{
 type:DataTypes.STRING,
 unique:true,
 allowNull:false
},


name:{
 type:DataTypes.STRING,
 allowNull:false
},


price:{
 type:DataTypes.FLOAT,
 allowNull:false
},


quantity:{
 type:DataTypes.INTEGER,
 defaultValue:0
}


},{
timestamps:true
});


module.exports=Product;