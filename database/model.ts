// model.ts
import pool from './db';

interface QueryParams {
  [key: string]: any;
}

/**
 * Function to execute raw SQL queries with optional parameterized values
 */
export async function customSQL(query: string, values: any[] = []): Promise<any[]> {
  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw new Error("Failed to execute SQL query");
  }
}

export abstract class BaseModel<T extends QueryParams> {
  public tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  /**
   * Retrieve all records from the table
   */
  async findAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    const result = await pool.query(query);
    return result.rows as T[];
  }

  /**
   * Retrieve records with pagination
   */
  async findAllWithPagination(limit: number, page: number): Promise<T[]> {
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM ${this.tableName} LIMIT $1 OFFSET $2`;
    const result = await pool.query(query, [limit, offset]);
    return result.rows as T[];
  }

  /**
   * Insert a new record into the table
   */
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

  /**
   * Find a single record by a specific column
   */
  async findBy(column: keyof T, value: any): Promise<T | null> {
    const query = `SELECT * FROM ${this.tableName} WHERE ${String(column)} = $1`;
    const result = await pool.query(query, [value]);
    return result.rows[0] ? (result.rows[0] as T) : null;
  }

  /**
   * Find multiple records by a specific column
   */
  async findMany(column: keyof T, value: any): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName} WHERE ${String(column)} = $1`;
    const result = await pool.query(query, [value]);
    return result.rows as T[];
  }

  /**
   * Update a record in the table by a specific column
   */
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

  /**
   * Delete a record from the table by a specific column
   */
  async delete(column: keyof T, value: any): Promise<T | null> {
    const query = `DELETE FROM ${this.tableName} WHERE ${String(column)} = $1 RETURNING *`;
    const result = await pool.query(query, [value]);
    return result.rows[0] ? (result.rows[0] as T) : null;
  }

  /**
   * Execute a custom query with parameterized values
   */
  async customQuery(query: string, values: any[]): Promise<any[]> {
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error) {
      console.error("Custom query error:", error);
      throw new Error("Failed to execute custom query");
    }
  }
}
