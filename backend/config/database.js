const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Otomatis membuat tabel jika belum ada
const initDB = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS user (
                idUser INT AUTO_INCREMENT PRIMARY KEY,
                Username VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `;
        await db.query(createTableQuery);

        const createItemsTableQuery = `
            CREATE TABLE IF NOT EXISTS items (
                id INT AUTO_INCREMENT PRIMARY KEY,
                kode VARCHAR(50) NOT NULL,
                nama VARCHAR(255) NOT NULL,
                kategori VARCHAR(100) NOT NULL,
                harga DECIMAL(15, 2) NOT NULL,
                stok INT NOT NULL,
                deskripsi TEXT,
                idUser INT NOT NULL,
                FOREIGN KEY (idUser) REFERENCES user(idUser) ON DELETE CASCADE
            )
        `;
        await db.query(createItemsTableQuery);

        console.log("Database siap: Tabel 'user' dan 'items' berhasil dicek/dibuat otomatis.");
    } catch (error) {
        console.error("Gagal membuat tabel:", error);
    }
};

initDB();

module.exports = db;