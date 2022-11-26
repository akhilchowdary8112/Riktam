const express = require("express");
let router = express.Router();
let Collector = require("../utility/collector");
router.post("/login", Collector.getLogin);
router.post("/SignUp", Collector.UserSignUp);
router.post("/updatepassword", Collector.updatepassword);
router.post("/addproblem", Collector.addproblem);
router.post("/addcomment", Collector.addcomment);
router.post("/fetchproblems", Collector.fetchproblems);
router.post("/addlike",Collector.addlike);
module.exports = router;