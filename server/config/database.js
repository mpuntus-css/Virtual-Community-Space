import pkg from 'pg'; 
const { Pool } = pkg; 
// import { Pool } from 'pg';
import { dbConfig } from './config.js'; 

const pool = new Pool(dbConfig); 

pool.connect((err, client, release) => {
    if (err) {
        console.error('⚠️ Error connecting to the database:', err.stack);
    } else {
        console.log('✅ Database connected successfully!');
    }
    release();
});

export { pool };