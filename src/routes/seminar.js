const express = require("express");
const router = express.Router();
const seminar = require("../models/seminarModels");
const seminarControllers = require("../controllers/seminar");

router.post("/", seminarControllers.postSeminar);

router.get("/", seminarControllers.getSeminar);

router.get("/search/byDate", seminarControllers.getSeminarByDate);

router.get('/search/byUserID/:id', seminarControllers.getSeminarByUserId);

router.get('/search/byKeyword/:keyword', seminarControllers.searchSeminar);

router.get("/:id", seminarControllers.getSeminarById);

router.patch("/:id", seminarControllers.patchSeminar);

router.delete("/:id", seminarControllers.deleteSeminar);

module.exports = router;
