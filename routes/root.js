const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // for parsing multipart/form-data

const { getRootController } = require("../controllers/root");
const getTypesController = require("../controllers/getTypes");
const uploadAvatar = require("../controllers/uploadAvatar");

router.get("/", getRootController);
router.get("/get-types", getTypesController);
router.post("/upload-avatar", upload.single("avatar"), uploadAvatar);

module.exports = router;
