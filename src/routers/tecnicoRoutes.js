const express = require('express');
const router = express.Router();
const tecnicoController = require('../controller/tecnicoController');

router.get('/', tecnicoController.listaTecnico);
router.post('/', tecnicoController.crearTecnico);
router.put('/:id', tecnicoController.actualizarTecnico);
router.delete('/:id', tecnicoController.eliminarTecnico);

module.exports = router;
