const { Schema, model, Types: { ObjectId } } = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const TrackSchema = new Schema(
    {
        name: {
            type: String
        },
        album: {
            type: String
        },
        cover: {
            type: String,
            validate: {
                validator: req => {
                    return true;
                },
                message: "ERROR_URL"
            }
        },
        artist: {
            name: {
                type: String
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            }
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        mediaId: {
            type: ObjectId
        }
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false // remove __v
    }
);

/**
 * Implementar metodo propio con relacion a storage
 */
TrackSchema.statics.findAllData = function () {
    const join = this.aggregate([ // pasamos un array de objetos dentro del objeto ponemos diferentes stages/etapas por las que pasa la consulta
        {
            $lookup: { // $lookup es una funcion de mongoose que nos permite hacer un join entre dos collecciones
                from: "storages",      // Tracks --> Storages
                localField: "mediaId", // Tracks.mediaId
                foreignField: "_id",   // Storages._id
                as: "audio"            // todo el resultado que consiga lo almacenamos en un alias/array llamado audio
            }
        }, // implementacion de otro stage etapa en este aggregate
        { 
            $unwind: "$audio", // especificamos el campo que queremos aplicar esa propiedad con simbolo de $ por ser una varibale, queremos aplicar ese margen de ventana a la propiedad audio
        }
    ]);
    return join;
};

TrackSchema.statics.findOneData = function (id) {
    const join = this.aggregate([ // pasamos un array de objetos dentro del objeto ponemos diferentes stages/etapas por las que pasa la consulta
        { // por temas de performance, hacer primero el match para basarse en esa coincidencia y despues el lookup
            $match: { // nos permite hacer un match entre dos collecciones
            _id: ObjectId(id) // este _id hace referencia al padre (storages)
            }
        },
        { // $lookup es una funcion de mongoose que nos permite hacer un join entre dos collecciones
            $lookup: {
                from: "storages",      // Tracks --> Storages
                localField: "mediaId", // Tracks.mediaId
                foreignField: "_id",   // Storages._id
                as: "audio"            // todo el resultado que consiga lo almacenamos en un alias/array llamado audio
            }
        },
        { // implementacion de otro stage etapa en este aggregate
            $unwind: "$audio", // especificamos el campo que queremos aplicar esa propiedad con simbolo de $ por ser una varibale, queremos aplicar ese margen de ventana a la propiedad audio
        }
    ]);
    return join;
};

TrackSchema.plugin(mongooseDelete, { overrideMethods: "all" }); // this schema use soft delete

module.exports = model("Track", TrackSchema);