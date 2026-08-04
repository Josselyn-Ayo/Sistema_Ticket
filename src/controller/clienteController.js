const Cliente = require('../models/Cliente');

// para obtener clientes
const listaCliente = async(req, res) =>{
    try{
        const clientes = await Cliente.findAll();
        res.json(clientes);
    }catch(error){
        res.status(500).json({error: 'Error al obtener los clientes'})
    }
};

// para crear un cliente
const crearCliente = async(req, res)=>{
    try{
        const {nombre, apellido, cedula, fechaNacimiento, ciudad, direccion, telefono, email, dependencia} = req.body;
        if(!nombre || !apellido || !cedula || !fechaNacimiento || !ciudad || !direccion || !telefono || !email || !dependencia){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }
        if(!email.includes('@')|| !email.includes('.')){
            return res.status(400).json({message: 'El correo electrónico no es válido'});
        }
        if(!/^[0-9]{10}$/.test(telefono)){
            return res.status(400).json({message: 'El número de teléfono no es válido'});
        }
        if(!/^[0-9]{10}$/.test(cedula)){
            return res.status(400).json({message: 'La cedula no es valida'});
        }
        if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(nombre)){
            return res.status(400).json({message: 'El nombre no es válido'});
        }
        if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(apellido)){
            return res.status(400).json({message: 'El apellido no es válido'});
        }
        if(!/^\d{4}\-\d{2}\-\d{2}$/.test(fechaNacimiento)){
            return res.status(400).json({message: 'La fecha de nacimiento no es válida'})
        }
        const cliente = await Cliente.create(req.body);
        res.status(201).json(cliente);
    }catch(error){
        res.status(500).json({error: "Error al crear el cliente"});
    }
};

// para actualizar un cliente
const actualizarCliente = async(req, res)=>{
    try{
        const {id} = req.params;
        await Cliente.update(req.body,{where: {id}});
        res.json({message: 'Cliente actualizado correctamente'});
    }catch(error){
        console.log(error);
        res.status(500).json({error: 'Error al actualizar el cliente'});
    }
};

// para eliminar un cliente
const eliminarCliente = async(req, res)=>{
    try{
        const {id} = req.params;
        await Cliente.destroy({where:{id}});
        res.json({message: 'Cliente eliminado correctamente'});
    }catch(error){
        res.status(500).json({error: 'Error al eliminar el cliente'});
    }
};
module.exports={
    listaCliente,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}
