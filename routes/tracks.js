const router = require("express").Router();

const { validatorGetItem } = require("../validators/common");
const { validatorCreateItem } = require("../validators/tracks");

const authMiddleware = require("../middlewares/session");
const checkRol = require("../middlewares/rol");

const { getItem, getItems, createItem, updateItem, deleteItem } = require("../controllers/tracks");

// http://localhost:3000/api/tracks/ GET, POST, PUT, DELETE

// Lista de items
router.get("/", authMiddleware, getItems);
// Detalle de item
router.get("/:id", authMiddleware, validatorGetItem, getItem);
// Crear item
router.post(
    "/",                 // path de la ruta
    authMiddleware,      // authentication -> unauthorized 401
    checkRol(["admin"]), // authorization  -> forbidden    403
    validatorCreateItem, // validation     -> bad request  400
    createItem           // controller     -> created      201
);
// Actualizar item
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);
// Eliminar item
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router;