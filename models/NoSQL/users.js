const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const UserSchema = new Schema(
    {
        name: {
            type: String
        },
        age: {
            type: Number
        },
        email: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            select: false
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false // remove __v
    }
);

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = model("User", UserSchema);