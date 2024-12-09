import pool from "./db";
import fs from 'fs'

async function seedDatabaseRun() {
    // Read text from ./sql/*
    const sqlFiles = fs.readdirSync('./database/sql');
    for (const file of sqlFiles) {
        console.log(`Seeding trigger ${file}...`);
        const filePath = `./database/sql/${file}`;
        const sql = fs.readFileSync(filePath, 'utf-8');
        await pool.query(sql);
    }

    console.log('Seeding Database done!');
}

seedDatabaseRun()