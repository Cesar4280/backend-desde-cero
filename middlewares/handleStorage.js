const multer = require("multer");

const { extname } = require("path");
const { generateRandom } = require("../utils/random");

// multer configuration

const storage = multer.diskStorage({
    destination: "storage" /* (request, file, callback) => {
        const pathStorage = resolve("storage");
        callback(null, pathStorage);
    }*/,
    filename: (request, file, callback) => {
        const random = generateRandom();
        const extension = extname(file.originalname); // file.originalname.split(".").pop()
        const filename = `file-${random}${extension}`;
        callback(null, filename);
    }
});

const uploadMiddleware = multer({ storage });

module.exports = uploadMiddleware;