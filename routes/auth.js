const router = require("express").Router();

const { validatorLogin, validatorRegister } = require("../validators/auth");
const { login, register } = require("../controllers/auth");

// http://localhost:3000/api/auth/

router.post("/login", validatorLogin, login);
router.post("/register", validatorRegister, register);

/*
router.get("/", getItems);
router.get("/:id", validatorGetItem, getItem);
router.put("/:id", validatorGetItem, updateItem);
router.delete("/:id", validatorGetItem, deleteItem);
*/

module.exports = router;