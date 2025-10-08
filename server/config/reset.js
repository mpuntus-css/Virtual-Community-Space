// import { pool } from './database.js';
// import './dotenv.js';

// const createLocationsTable = async () => {
//     const createTableQuery = `
//         DROP TABLE IF EXISTS locations;

//         CREATE TABLE IF NOT EXISTS locations (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             address TEXT NOT NULL
//         );
//     `;

//     try {
//         await pool.query(createTableQuery);
//         console.log('🎉 locations table created successfully');
//     } catch (err) {
//         console.error('⚠️ error creating locations table', err);
//     }
// };

// const createEventsTable = async () => {
//     const createTableQuery = `
//         DROP TABLE IF EXISTS events;

//         CREATE TABLE IF NOT EXISTS events (
//             id SERIAL PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             date TIMESTAMP NOT NULL,
//             location_id INTEGER NOT NULL,
//             FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
//         );
//     `;

//     try {
//         await pool.query(createTableQuery);
//         console.log('🎉 events table created successfully');
//     } catch (err) {
//         console.error('⚠️ error creating events table', err);
//     }
// };

// const resetDatabase = async () => {
//     await createLocationsTable();
//     await createEventsTable();
//     console.log('✅ Database reset complete');
// };

// resetDatabase();


import { pool } from './database.js';

const dropTable = async (tableName) => {
    try {
        await pool.query(`DROP TABLE IF EXISTS ${tableName} CASCADE;`);
        console.log(`✅ Table "${tableName}" dropped successfully`);
    } catch (err) {
        console.error(`⚠️ Error dropping table "${tableName}":`, err);
    }
};

const createLocationsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address TEXT NOT NULL           
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 Locations table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating locations table:', err);
    }
};

const createEventsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            date TIMESTAMP NOT NULL,
            location_id INTEGER NOT NULL,
            FOREIGN KEY (location_id) REFERENCES locations (id) ON DELETE CASCADE
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('🎉 Events table created successfully');
    } catch (err) {
        console.error('⚠️ Error creating events table:', err);
    }
};

const resetDatabase = async () => {
    try {
        console.log('🔄 Resetting database...');
        await dropTable('events'); // Drop dependent table first
        await dropTable('locations'); // Drop parent table next
        await createLocationsTable();
        await createEventsTable();
        console.log('✅ Database reset complete');
    } catch (err) {
        console.error('⚠️ Error resetting database:', err);
    } finally {
        pool.end(); // Close the database connection
    }
};

resetDatabase();