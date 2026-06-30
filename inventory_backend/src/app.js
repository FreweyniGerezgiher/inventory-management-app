const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Inventory API running"
    });
});

// Routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/products", require("./routes/product.routes"));
app.use("/api/transactions", require("./routes/transaction.routes"));

// IMPORTANT: Error middleware MUST be last
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

module.exports = app;