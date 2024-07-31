import mysql from 'mysql2/promise';
import { config } from '../config.js';

const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name
});

export const verificarTabelas = async () => {
    const createRouteMappingsTable = `
        CREATE TABLE IF NOT EXISTS route_mappings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            route VARCHAR(255) NOT NULL,
            url VARCHAR(255) NOT NULL
        )
    `;

    const createNotificationLogsTable = `
        CREATE TABLE IF NOT EXISTS notification_logs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            route VARCHAR(255) NOT NULL,
            target_url VARCHAR(255) NOT NULL,
            notification JSON NOT NULL,
            response TEXT,
            status_code INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `;

    try {
        await pool.query(createRouteMappingsTable);
        await pool.query(createNotificationLogsTable);
        console.log('Tabelas verificadas e criadas se necessário.');
    } catch (error) {
        console.error('Erro ao verificar/criar tabelas:', error);
        throw error;
    }
};
