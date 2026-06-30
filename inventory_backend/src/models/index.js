const User=require("./User");
const Product=require("./Product");
const Transaction=require("./Transaction");


Product.hasMany(Transaction,{
    foreignKey:"productId"
});


Transaction.belongsTo(Product,{
    foreignKey:"productId"
});


module.exports={
    User,
    Product,
    Transaction
};