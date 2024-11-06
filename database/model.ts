// BaseModel.ts
import pool from './db';

interface QueryParams {
    [key: string]: any;
}

export abstract class BaseModel<T extends QueryParams> {
    public tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async create(data: T): Promise<T> {
        const columns = Object.keys(data).join(', ');
        const placeholders = Object.keys(data).map((_, idx) => `$${idx + 1}`).join(', ');
        const values = Object.values(data);

        const query = `
      INSERT INTO ${this.tableName} (${columns})
      VALUES (${placeholders})
      RETURNING *;
    `;
        const result = await pool.query(query, values);
        return result.rows[0] as T;
    }

    async findBy(column: keyof T, value: any): Promise<T | null> {
        const query = `SELECT * FROM ${this.tableName} WHERE ${String(column)} = $1`;
        const result = await pool.query(query, [value]);
        return result.rows[0] ? (result.rows[0] as T) : null;
    }

    async update(column: keyof T, value: any, data: Partial<T>): Promise<T | null> {
        const updates = Object.keys(data)
            .map((key, idx) => `${key} = $${idx + 1}`)
            .join(', ');
        const values = [...Object.values(data), value];

        const query = `
      UPDATE ${this.tableName}
      SET ${updates}
      WHERE ${String(column)} = $${values.length}
      RETURNING *;
    `;
        const result = await pool.query(query, values);
        return result.rows[0] ? (result.rows[0] as T) : null;
    }

    async delete(column: keyof T, value: any): Promise<T | null> {
        const query = `DELETE FROM ${this.tableName} WHERE ${String(column)} = $1 RETURNING *`;
        const result = await pool.query(query, [value]);
        return result.rows[0] ? (result.rows[0] as T) : null;
    }

    async customQuery(query: string, values: any[]): Promise<T[]> {
        const result = await pool.query(query, values);
        return result.rows as T[];   
    }
}
