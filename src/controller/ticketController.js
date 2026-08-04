const Ticket = require('../models/Ticket');
const Cliente = require('../models/Cliente');
const Tecnico = require('../models/Tecnico');

// crear un ticket
const crearTicket = async(req, res) =>{
    try{
        const {codigo, descripcion, cliente_id, tecnico_id}= req.body;
        const cliente = await Cliente.findByPk(cliente_id);
        const tecnico = await Tecnico.findByPk(tecnico_id);
        if(!cliente || !tecnico){
            return res.status(404).json({message: 'cliente o tecnico no encontrado'});
        } 
        const Nuevoticket = await Ticket.create({
            codigo, descripcion, cliente_id, tecnico_id
        });
        res.status(201).json({message: 'Ticket creado correctamente', data: Nuevoticket});
    }catch(error){
        res.status(500).json({message: "Error al crear el ticket", error: error.message});
    }
};

// obtener todos los tickets
const listaTicket = async(req,res)=>{
    try{

        const ticket = await Ticket.findAll({ 
            include: [{model: Cliente, attributes:['nombre', 'apellido', 'email']},
            {model: Tecnico, attributes: ['nombre', 'apellido']}]
        })
        res.json(ticket);
    }catch(error){
        res.status(500).json({message: "Error al obtener los tickets", error: error.message});
    }
}
module.exports ={
    crearTicket,
    listaTicket
}