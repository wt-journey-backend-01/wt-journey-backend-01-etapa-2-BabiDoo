import 'dotenv/config'; //middleware de config da biblioteca dotenv
import express from 'express';
import agentesRoutes from './routes/agentesRoutes.js';
import casosRoutes from './routes/casosRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000; //usa a variavel PORT que esta definida no arquivo .env
app.use(express.json()); //middleware do express para lidar com dados do tipo json
app.use('/agentes', agentesRoutes);
app.use('/casos', casosRoutes);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));