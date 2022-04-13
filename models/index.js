const DB_ENGINE = process.env.DATABASE_ENGINE;

const models = {
    userModel: require(`./${DB_ENGINE}/users`),
    trackModel: require(`./${DB_ENGINE}/tracks`),
    storageModel: require(`./${DB_ENGINE}/storages`)
};

module.exports = models;