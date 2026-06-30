const express = require("express");

const router = express.Router();


const userController = require("../controllers/user.controller");

const validate = require("../middleware/validation.middleware");


const { userValidation } = require("../validations/user.validation");



router.post(
    "/",
    userValidation,
    validate,
    userController.createUser
);


module.exports = router;