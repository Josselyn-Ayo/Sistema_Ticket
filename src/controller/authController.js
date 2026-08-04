const Usuario = require('../models/Usuario');
const login = async(req, res)=>{
    const {email, password} = req.body;
    try{
        if(!email || !password){
            return res.status(400).json({message: "Email y contraseña son requeridos"});
        }
        if(!email.includes('@')|| !email.includes('.')){
            return res.status(400).json({message: " Correo invalido"});
        }
        const usuario = await Usuario.findOne({where: {email}});
        if(usuario && usuario.password == password){
            res.json({message: `Bienvenidos - ${usuario.nombre}`,
            user:{nombre : usuario.nombre, email: usuario.email}});
        }else{
            res.status(401).json({message: "Usuario o contraseña incorrectos"});
        }
    }catch(error){
        res.status(500).json({message: "Erroral servidor"});
    }
};
module.exports ={
    login
}

