const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const User = sequelize.define("User",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.NUMBER
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.ENUM(["user", "admin"])
        }
    },
    {
        timestamps: true
        // tableName: "user"
    }
);

module.exports = User;