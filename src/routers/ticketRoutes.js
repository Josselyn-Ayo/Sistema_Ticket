const express = require('express');
const router = express.Router();
const ticketController= require('../controller/ticketController');

router.post('/', ticketController.crearTicket);
router.get('/', ticketController.listaTicket);

module.exports = router;