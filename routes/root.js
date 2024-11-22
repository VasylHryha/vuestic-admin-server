const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // for parsing multipart/form-data

const { getRootController } = require("../controllers/root");
const getTypesController = require("../controllers/getTypes");
const avatars = require("../controllers/avatars");

router.get("/", getRootController);
router.get("/get-types", getTypesController);
router.post("/avatars", upload.single("avatar"), avatars.upload);
router.delete("/avatars/:id", upload.single("avatar"), avatars.remove);

module.exports = router;
