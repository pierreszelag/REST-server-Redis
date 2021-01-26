const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

function register(req, res) {
    let User = require('../models/user');

    let hash = bcrypt.hashSync(req.body.password, 10);

    let newUser = User ({
        username: req.body.username,
        password : hash
    });
  
    newUser.save()
    .then((savedUser) => {

        res.json(savedUser);
            
    }, (err) => {
        res.status(400).json(err)
    });

}

function authenticate(req, res) {

    let User = require('../models/user');

    const user = await User.findOne({username: req.body.username});
    if (user && bcrypt.compareSync(req.body.password, user.hash)) {
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, { expiresIn: "1 week"});
        res.status(200).send({user, token});
    }

}

function readUsers(req, res) {

    let User = require("../models/user");

    User.find({})
    .then((users) => {
        res.status(200).json(users);
    }, (err) => {
        res.status(500).json(err);
    });
}

function readUser(req, res) {

    let User = require("../models/user");

    User.findById({_id : req.params.id})
    .then((user) => {
        res.status(200).json(user);
    }, (err) => {
        res.status(500).json(err);
    });
}

function updateUser(req, res) {

    let User = require("../models/user");

    User.findByIdAndUpdate({_id: req.params.id}, 
        {username : req.body.username, 
        password : req.body.password}, 
        {new : true})
    .then((updatedUser) => {
        res.status(200).json(updatedUser);
    }, (err) => {
        res.status(500).json(err);
    });
}

function deleteUser(req, res) {

    let User = require("../models/user");

    User.findOneAndRemove({_id : req.params.id})
    .then((deletedUser) => {
        res.status(200).json(deletedUser);
    }, (err) => {
        res.status(500).json(err);
    });
}


module.exports.register = register;
module.exports.authenticate = authenticate;
module.exports.reads = readUsers;
module.exports.read = readUser;
module.exports.delete = deleteUser;
module.exports.update = updateUser;
