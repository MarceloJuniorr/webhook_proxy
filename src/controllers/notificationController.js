import axios from 'axios';
import { logNotification } from '../models/logModel.js';

let routeMappings = {};

export const setRouteMappings = (mappings) => {
    routeMappings = mappings;
};

export const handleNotification = async (req, res) => {
    const route = req.params.route;
    const notification = req.body;

    const targetUrl = routeMappings[route];

    if (!targetUrl) {
        res.status(400).send('Invalid route');
        return;
    }

    // Copiar e filtrar headers
    const headers = { ...req.headers };
    delete headers.host;
    delete headers['content-length'];

    try {
        const response = await axios.post(targetUrl, notification, {
            headers,
            params: req.query
        });

        await logNotification(route, targetUrl, notification, response.data, response.status);
        res.status(response.status).send(response.data);
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        const responseMessage = error.response ? error.response.data : 'Internal Server Error';
        await logNotification(route, targetUrl, notification, responseMessage, statusCode);
        res.status(statusCode).send(responseMessage);
    }
};
