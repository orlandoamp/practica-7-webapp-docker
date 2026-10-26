const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = process.env.PORT || 3000;

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'practica7_db',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/', (req, res) => {
    pool.query('SELECT NOW() AS fecha_servidor, VERSION() AS version_mysql', (err, results) => {
        if (err) {
            return res.status(500).send(`
                <h1>Hola Mundo</h1>
                <p>Estado de la base de datos: <strong>Error de conexión</strong></p>
                <p>Detalle: ${err.message}</p>
            `);
        }

        const info = results[0];
        res.send(`
            <h1>Hola Mundo</h1>
            <p>Conexión exitosa a la base de datos MySQL.</p>
            <ul>
                <li><strong>Versión de MySQL:</strong> ${info.version_mysql}</li>
                <li><strong>Fecha y hora del servidor MySQL:</strong> ${info.fecha_servidor}</li>
            </ul>
        `);
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
