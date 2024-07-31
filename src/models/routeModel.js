import mysql from 'mysql2/promise';
import { config } from '../config.js';

const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name
});

export const getAllRouteMappings = async () => {
    const [rows] = await pool.query('SELECT route, url FROM route_mappings');
    const routeMappings = {};
    rows.forEach(row => {
        routeMappings[row.route] = row.url;
    });
    return routeMappings;
};
