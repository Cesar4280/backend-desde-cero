const DB_ENGINE = process.env.DATABASE_ENGINE;

const getProperties = () => {
    const data = {
        SQL: { "id": "id" },
        NoSQL: { "id": "_id" }
    };
    return data[DB_ENGINE];
};

module.exports = getProperties;