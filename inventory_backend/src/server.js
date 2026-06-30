require("dotenv").config();

const app = require("./app");
const sequelize = require("./config/database");

require("./models");

const PORT = process.env.PORT || 3000;
// Test DB connection + start server
sequelize.sync()
.then(() => {
    console.log("Database connected");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})
.catch(err => {
    console.log("Database error:", err);
});