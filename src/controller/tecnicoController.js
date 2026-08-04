const Tecnico = require('../models/Tecnico');
const Cliente = require('../models/Cliente');

// para obtener tecnicos
const listaTecnico = async(req, res)=>{
    try{
        const tecnicos = await Tecnico.findAll();
        res.json(tecnicos);
    }catch(error){
        res.status(500).json({message: 'Error al obtener los tecnicos'});
    }
};

// para crear un tecnico
const crearTecnico = async(req, res)=>{
    try{
        const {nombre, apellido, cedula, fechaNacimiento, ciudad, direccion, telefono, email, genero}= req.body;
        if(!nombre || !apellido || !cedula || !fechaNacimiento || !ciudad || !direccion || !telefono || !email || !genero){
            return res.status(400).json({message: 'Todos los campos son obligatorios'});
        }
        if(!/^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento)){
            return res.status(400).json({message: 'La fecha de nacimiento debe tener el formato YYYY-MM-DD'});
        }
        if(!/^[A-Za-zÁÉÍÓÚáéíóúñÑ]+$/.test(nombre)){
            return res.status(400).json({message: "El nombre solo puede contener letras"});
        }
        if(!/^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/.test(apellido)){
            return res.status(400).json({message: "El apellido solo puede contener letras"});
        }
        if(!/^[0-9]{10}$/.test(cedula)){
            return res.status(400).json({message: "La cédula solo puede contener números"});
        }
        if(!/^[0-9]{10}$/.test(telefono)){
            return res.status(400).json({message: "El teléfono solo puede contener números"});
        }
        const tecnico = await Tecnico.create(req.body);
        res.status(201).json(tecnico);
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'Error al crear el tecnico'});
    }
};

// para actualizar un tecnico
const actualizarTecnico = async(req, res)=>{
    try{
        const {id} = req.params;
        await Tecnico.update(req.body,{where:{id}});
        res.json({message: 'Tecnico actualizado correctamente'});
    }catch(error){
        res.status(500).json({message: 'Error al actualizar el tecnico'});
    }
};

// para eliminar un tecnico 
const eliminarTecnico = async(req, res)=>{
    try{
        const {id} = req.params;
        await Tecnico.destroy({where:{id}});
        res.json({message: 'Tecnico eliminado correctamente'});
    }catch(error){
        res.status(500).json({message: 'Error al eliminar el tecnico'});
    }
};

module.exports ={
    listaTecnico,
    crearTecnico,
    actualizarTecnico,
    eliminarTecnico
}