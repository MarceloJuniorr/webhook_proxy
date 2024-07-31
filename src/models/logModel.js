import mysql from 'mysql2/promise';
import { config } from '../config.js';

const pool = mysql.createPool({
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.name
});

export const logNotification = async (route, targetUrl, notification, response, statusCode) => {
    const query = `
        INSERT INTO notification_logs (route, target_url, notification, response, status_code)
        VALUES (?, ?, ?, ?, ?)
    `;
    const values = [
        route,
        targetUrl,
        JSON.stringify(notification),
        JSON.stringify(response),
        statusCode
    ];

    const [rows] = await pool.query(query, values);
    return rows;
};
