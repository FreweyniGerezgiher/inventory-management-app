const { User } = require("../models");

// POST /api/users
exports.createUser = async (req, res, next) => {
    console.log("REQ BODY:", req.body);

    try {

        const {
            name,
            email
        } = req.body;


        const user = await User.create({
            name,
            email
        });


        res.status(201).json({
            message: "User created successfully",
            data: user
        });


    } catch (error) {
        next(error);

    }

};