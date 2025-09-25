import sql, { ConnectionPool, IResult, Transaction } from 'mssql';
import { config } from '@/config';
import { logger } from '@/utils/logger';

let pool: ConnectionPool;

const dbConfig: sql.config = {
  server: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  options: {
    ...config.database.options,
    connectionTimeout: 30000,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
  },
};

export const connectDB = async (): Promise<ConnectionPool> => {
  if (pool) return pool;
  try {
    pool = await new ConnectionPool(dbConfig).connect();
    logger.info('SQL Server connected successfully.');
    pool.on('error', err => logger.error('SQL Server pool error', err));
    return pool;
  } catch (err) {
    logger.error('Failed to connect to SQL Server', err);
    process.exit(1);
  }
};

export enum ExpectedReturn {
  Single,
  Multi,
  None,
}

/**
 * @summary
 * Executes a stored procedure against the database.
 * 
 * @param {string} routine - The name of the stored procedure.
 * @param {object} parameters - The parameters for the stored procedure.
 * @param {ExpectedReturn} expectedReturn - The expected return type.
 * @param {Transaction} [transaction] - Optional transaction object.
 * @returns {Promise<any>}
 */
export const dbRequest = async (
  routine: string,
  parameters: object,
  expectedReturn: ExpectedReturn,
  transaction?: Transaction
): Promise<any> => {
  const connection = transaction || (await connectDB());
  const request = connection.request();

  for (const [key, value] of Object.entries(parameters)) {
    request.input(key, value);
  }

  const result: IResult<any> = await request.execute(routine);

  switch (expectedReturn) {
    case ExpectedReturn.Single:
      return result.recordset[0] || null;
    case ExpectedReturn.Multi:
      return result.recordsets;
    case ExpectedReturn.None:
      return;
    default:
      return result.recordsets;
  }
};
