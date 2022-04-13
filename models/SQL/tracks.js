const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/mysql");

const Storage = require("./storages");

const Track = sequelize.define("Track",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        album: {
            type: DataTypes.STRING
        },
        cover: {
            type: DataTypes.STRING
        },
        artist_name: {
            type: DataTypes.STRING
        },
        artist_nickname: {
            type: DataTypes.STRING
        },
        artist_nationality: {
            type: DataTypes.STRING
        },
        duration_start: {
            type: DataTypes.INTEGER
        },
        duration_end: {
            type: DataTypes.INTEGER
        },
        mediaId: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: true
    }
);

/**
 * Implementando o modelo personalizado
 */

Track.findAllData = function () {
    Track.belongsTo(Storage, { // una 'cancion' forma parte de un 'almacenamiento'
        foreignKey: "mediaId", // donde el campo foraneo es 'mediaId'
        as: "audio" // alias de la relacion se llama 'audio'
    })
    return Track.findAll({ include: "audio" }); // le digo que incluya el modelo Storage (audio) en la consulta
};

Track.findAllData = function (id) {
    Track.belongsTo(Storage, { // una 'cancion' forma parte de un 'almacenamiento'
        foreignKey: "mediaId", // donde el campo foraneo es 'mediaId'
        as: "audio" // alias de la relacion se llama 'audio'
    })
    return Track.findOne({ where: { id }, include: "audio" }); // le digo que incluya el modelo Storage (audio) en la consulta
};

/*
Track.find = Track.findAll;
Track.findById = Track.findByPk;
*/

module.exports = Track;