const express = require('express');
const router = express.Router();
const callService = require('./call.service');

// Rotas
router.post('/:id/calls/new', addNewCall);
router.get('/:id/list', listAllCalls);
router.get('/:id/listopen', listOpenCalls);
router.get('/:id/listclosed', listClosedCalls);
//router.put('/:id/role/call/:idcall/edit', editCall);
//router.delete('/:id/role/calls/:idcall', removeCall);

module.exports = router;

// FUNÇÕES DO CONTROLLER

function addNewCall(req, res, next){
  callService.addNewCall(req.body, req.params)
    .then(() => res.json({message: "Chamado registrado com sucesso"}))
    .catch(err => next(err));
}

function listAllCalls(req, res, next){
  callService.listAllCalls(req.params)
    .then(calls => res.json(calls))
    .catch(err => next(err));
}

function listOpenCalls(req, res, next){
  callService.listOpenCalls(req.params)
    .then(calls => res.json(calls))
    .catch(err => next(err));
}

function listClosedCalls(req, res, next){
  callService.listClosedCalls(req.params)
  .then(calls => res.json(calls))
  .catch(err => next(err));
}
