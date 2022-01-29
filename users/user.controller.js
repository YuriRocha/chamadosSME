const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// Rotas
router.post('/register', register);
router.post('/login', login);
router.get('/:id', profile);
router.post('/teste', teste);
console.log("controller");
module.exports = router;

// FUNÇÕES DO CONTROLLER
function register(req, res, next){
    userService.register(req.body)
        .then(() => res.json({message: "Sua conta foi criada com sucesso!"}))
        .catch(err => next(err));
}

function login(req, res, next){
    userService.login(req.body)
        .then(user => user ? res.json(user): res.status(400).json({message: "Username or password incorrect"}))
        .catch(err => next(err));
}

function profile(req, res, next){
    userService.profile(req.params)
        .then(user => res.json(user))
        .catch(err => next(err));
}

function teste(req, res, next){
    userService.teste(req.body)
        .then(obj => res.json(obj))
        .catch(err => next(err));
}
