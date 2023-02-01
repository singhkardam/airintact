const { 
    createUser,
    getUserId,
    getUserById,
    getAllUser,
    deleteUser,
    login,
    accoutDetails,
    getAllChildren 
} = require("./user.controller");
const { checkToken } = require("../../auth/token.validation");

const router = require("express").Router();


router.post("/", createUser);
router.get("/user-id", getUserId);
router.get("/children-of-user/:parent_id", getAllChildren);
router.get("/", checkToken, getAllUser);
router.get("/:id", checkToken, getUserById);
//router.delete("/", checkToken, deleteUser);
router.post("/login", login);
router.patch("/update-account-details", checkToken , accoutDetails);
module.exports = router;