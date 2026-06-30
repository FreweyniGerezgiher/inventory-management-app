const { success, error } = require("../utils/response");
const { Product, Transaction } = require("../models");

const sequelize = require("../config/database");



// POST /api/products
exports.createProduct = async (req, res) => {
    try {

        const product = await Product.create(req.body);

        return res.status(201).json(
            success(product, "Product created successfully")
        );

    } catch (err) {
        return res.status(500).json(
            error("Failed to create product")
        );
    }
};

// GET All products
exports.getAllProducts = async (req, res) => {
    try {

        const products = await Product.findAll({
            order: [["updatedAt", "DESC"]]
        });

        return res.status(200).json(
            success(products, "Products fetched successfully")
        );

    } catch (err) {
        return res.status(500).json(
            error("Failed to fetch products")
        );
    }
};

exports.updateStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, amount } = req.body;

        const product = await Product.findByPk(id);

        if (!product) {
            return res.status(404).json(
                error("Product not found")
            );
        }

        let newQuantity = product.quantity;

        if (type === "INCREASE") {
            newQuantity += amount;
        } else {
            if (product.quantity < amount) {
                return res.status(400).json(
                    error("Stock cannot go below zero")
                );
            }
            newQuantity -= amount;
        }

        product.quantity = newQuantity;
        await product.save();

        await Transaction.create({
            productId: id,
            type,
            amount,
            oldQuantity: product.quantity,
            newQuantity
        });

        return res.status(200).json(
            success(product, "Stock updated successfully")
        );

    } catch (err) {
        return res.status(500).json(
            error("Stock update failed")
        );
    }
};








