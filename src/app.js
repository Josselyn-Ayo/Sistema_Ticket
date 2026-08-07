const express = require('express');
const cors = require('cors');
const db = require('./config/db');

//Modelos
const Cliente = require('./models/Cliente');
const Tecnico = require('./models/Tecnico');
const Ticket = require('./models/Ticket');
const Usuario = require('./models/Usuario');

//Rutas
const authRoutes = require('./routers/authRoutes');
const clienteRoutes = require('./routers/clienteRoutes');
const tecnicoRoutes = require('./routers/tecnicoRoutes');
const ticketRoutes = require('./routers/ticketRoutes');

app = express();
app.use(cors());
app.use(express.json());

//Relaciones
Ticket.belongsTo(Cliente, {foreignKey: 'cliente_id'});
Ticket.belongsTo(Tecnico, {foreignKey: 'tecnico_id'});

Cliente.hasMany(Ticket, {foreignKey: 'cliente_id'});
Tecnico.hasMany(Ticket, {foreignKey: 'tecnico_id'});

//Rutas
app.get('/',(req, res)=>{
res.send("Bienvenido a la API de tickets");   
})
// endpoints
app.use('/api/auth', authRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/tecnicos', tecnicoRoutes);
app.use('/api/tickets', ticketRoutes);

async function main() {
    try {
        await db.sync({ force: false });
        console.log('✅ Base de datos de Tickets sincronizada');
        app.listen(3000, () => console.log('🚀 Servidor en http://localhost:3000'));
    }catch (e) {
        console.error(e);
    }
}

main();