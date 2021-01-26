//Access the router on Express 
const router = require('express').Router();

//Access the controllers
const uController = require('../controllers/user');
const cController = require('../controllers/call');

router.post("/register", (req, res) => {

    uController.register(req, res);

});

router.post("/signin", (req, res) => {

    uController.authenticate(req, res);

});

router.get("/users", (req, res) => {
    
    uController.reads(req, res);

});

router.get("/user/:id", (req, res) => {
    
    uController.read(req, res);

});

router.put("/user/:id", (req, res) => {
    
    uController.update(req, res);

});

router.delete("/user/:id", (req, res) => {
    
    uController.delete(req, res);

});

router.get("/call/", (req, res) => {
    
    cController.read(req, res);

});


module.exports = router;