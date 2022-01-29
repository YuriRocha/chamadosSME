const express = require('express');
const router = express.Router();
const callService = require('./call.service');

// Rotas
router.post('/:id/calls/new', addNewCall);
//router.get('/:id/role/', listOpenCalls);
//router.get('/:id/role', listClosedCalls);
//router.get('/:id/role', listAllCalls);
//router.put('/:id/role/call/:idcall/edit', editCall);
//router.delete('/:id/role/calls/:idcall', removeCall);

module.exports = router;

// FUNÇÕES DO CONTROLLER

function addNewCall(req, res, next){
  callService.addNewCall(req.body, req.params)
    .then(() => res.json({message: "Chamado registrado com sucesso"}))
    .catch(err => next(err));
}
