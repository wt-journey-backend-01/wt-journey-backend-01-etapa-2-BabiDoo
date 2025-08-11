import 'dotenv/config'; //middleware de config da biblioteca dotenv
import express from 'express';
import agentRoutes from './routes/agenteRoutes.js';
import caseRoutes from './routes/casoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000; //usa a variavel PORT que esta definida no arquivo .env
app.use(express.json()); //middleware do express para lidar com dados do tipo json
app.use('/agentes', agentRoutes);
app.use('/casos', caseRoutes);

app.listen(PORT, () => console.log(`Server on port ${PORT}`));