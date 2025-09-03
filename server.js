import 'dotenv/config'; //middleware de config da biblioteca dotenv
import express from 'express';
import swaggerSpec from './docs/swagger.js';
import swaggerUi from 'swagger-ui-express';
import agentRoutes from './routes/agentesRoutes.js';
import caseRoutes from './routes/casosRoutes.js';
import { errorHandler } from './utils/errorHandler.js';


const app = express();
const PORT = process.env.PORT || 3000; //usa a variavel PORT que esta definida no arquivo .env
app.use(express.json()); //middleware do express para lidar com dados do tipo json
app.use('/agentes', agentRoutes);
app.use('/casos', caseRoutes);

app.use(errorHandler);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.get('/docs.json', (_req, res) => res.json(swaggerSpec));

app.listen(PORT, () => console.log(`Server on port ${PORT}`));