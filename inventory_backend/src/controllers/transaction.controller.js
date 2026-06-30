const { success, error } = require("../utils/response");
const paginate = require("../utils/paginate");
const { Transaction } = require("../models");

// GET /api/transactions?page=1
exports.getAllTransactions = async (req, res) => {
    try {

        const { page, size } = req.query;

        const { limit, offset } = paginate(page, size);

        const { count, rows } = await Transaction.findAndCountAll({
            limit,
            offset,
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json(
            success(
                {
                    total: count,
                    page: Number(page) || 1,
                    size: limit,
                    records: rows
                },
                "Transactions fetched successfully"
            )
        );

    } catch (err) {
        return res.status(500).json(
            error("Failed to fetch transactions")
        );
    }
};