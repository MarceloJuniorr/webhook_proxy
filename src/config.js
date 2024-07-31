import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 3042,
    database: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        name: process.env.DB_NAME
    }
};

export default config;
