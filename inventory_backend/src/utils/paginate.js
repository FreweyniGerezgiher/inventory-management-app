const paginate = (page = 1, size = 10) => {

    const limit = Number(size);
    const offset = (Number(page) - 1) * limit;

    return { limit, offset };
};

module.exports = paginate;