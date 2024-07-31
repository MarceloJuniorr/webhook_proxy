import express from 'express';
import bodyParser from 'body-parser';
import notificationRoutes from './routes/notifications.js';
import { config } from './config.js';
import { getAllRouteMappings } from './models/routeModel.js';
import { setRouteMappings } from './controllers/notificationController.js';
import { verificarTabelas } from './models/tableVerification.js';

const app = express();

app.use(bodyParser.json());

// Função para inicializar as rotas
const initializeRouteMappings = async () => {
    const routeMappings = await getAllRouteMappings();
    setRouteMappings(routeMappings);
    console.log('Route mappings loaded:', routeMappings);
};

// Inicialização da aplicação
const initializeApp = async () => {
    try {
        // Verificar e criar tabelas se necessário
        await verificarTabelas();
        // Carregar rotas na memória
        await initializeRouteMappings();
        console.log(`Server running on port ${config.port}`);
    } catch (error) {
        console.error('Failed to initialize application:', error);
        process.exit(1);
    }
};

app.use('/notify', notificationRoutes);

app.listen(config.port, () => {
    initializeApp();
});
