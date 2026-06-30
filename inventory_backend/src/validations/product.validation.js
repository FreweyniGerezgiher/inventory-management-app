const { body } = require("express-validator");

exports.productValidation = [

    body("sku")

    .trim()

    .notEmpty()

    .withMessage(
        "SKU is required"
    ),

    body("name")

    .trim()

    .notEmpty()

    .withMessage(
        "Product name is required"
    ),

    body("price")

    .notEmpty()

    .withMessage(
        "Price is required"
    )

    .isFloat({
        min:0
    })

    .withMessage(
        "Price must be a positive number"
    ),

    body("quantity")

    .notEmpty()

    .withMessage(
        "Quantity is required"
    )

    .isInt({
        min:0
    })

    .withMessage(
        "Quantity cannot be negative"
    )

];
