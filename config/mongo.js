const { connect } = require("mongoose");

const dbConnectMongo = () => {
    const URI = process.env.MONGO_URI;
    const options = { useNewUrlParser: true, useUnifiedTopology: true };
    connect(URI, options, error => console.log(error ? "Error connecting to MongoDB" : "Connected to MongoDB"));
};

module.exports = dbConnectMongo;