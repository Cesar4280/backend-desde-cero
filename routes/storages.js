const router = require("express").Router();
const uploadMiddleware = require("../middlewares/handleStorage");

const { validatorGetItem } = require("../validators/common");
// const { validatorCreateItem } = require("../validators/tracks");

const { getItem, getItems, createItem, deleteItem } = require("../controllers/storages");


// http://localhost:3000/api/storages/

router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.post("/", uploadMiddleware.single("myfile"), createItem);
router.delete("/:id", validatorGetItem, deleteItem);

module.exports = router;