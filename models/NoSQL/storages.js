const { Schema, model } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const StorageSchema = new Schema(
    {
        url: {
            type: String
        },
        filename: {
            type: String
        }
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false // remove __v
    }
);

StorageSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = model("Storage", StorageSchema);