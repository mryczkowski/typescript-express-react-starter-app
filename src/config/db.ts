import Sequelize from 'sequelize';
import { defineModels } from '../models/index';

export let sequelizeConn: Sequelize.Sequelize;

export async function initDB(shouldSync = false) {
    let tries = 5;
    let hasConnection = false;
    while (tries > 0) {
        try {
            getConnection();
            await sequelizeConn.authenticate();
            hasConnection = true;

            break;
        } catch (err) {
            console.log('Err connecting to db, retrying', err.message);
            await new Promise(resolve => setTimeout(resolve, 2000));
            tries--;
        }
    }

    if (!hasConnection) {
        console.error('Could not get DB connection');
        return false;
    }

    console.log('Connected to DB!');
    
    defineModels(sequelizeConn);

    // NOTE: sync is not needed for prod. It will be run along with migrations. 
    // It is useful for development since the schema is always changing. In development, you can pass 'force: true' as an option 
    // to flush the db every time the app starts.
    if (shouldSync) {
        return sequelizeConn.sync();
    }

    return Promise.resolve();
}

function getConnection() {
    const dbName = process.env.DB_NAME || '';
    const user = process.env.DB_USER || '';
    const pw = process.env.DB_PASSWORD || '';
    const host = process.env.DB_HOST || '';
    const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

    // Get local DB connection
    sequelizeConn = new Sequelize(dbName, user, pw, { 
        host,
        port,
        dialect: 'mysql',
        operatorsAliases: false,
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
    });
}

// Used for integration testing
export async function initTestDB() {
    const dbName = 'my_db_test';
    const user = process.env.DB_USER || '';
    const pw = process.env.DB_PASSWORD || '';
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;

    // Get local DB connection
    sequelizeConn = new Sequelize(dbName, user, pw, { 
        host,
        port,
        dialect: 'mysql',
        operatorsAliases: false,
        logging: false,
    });
    
    defineModels(sequelizeConn);

    return sequelizeConn.sync({ force: true });
}