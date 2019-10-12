const dotenv = require('dotenv');
const { initDB } = require('../build/config/db');

dotenv.config();

// Creates tables (if not exists) for all models defined src/models. Should be done before migrations to get db tables up to date.
initDB(true).then(() => {
    console.log('\nsync complete\n');
    process.exit(0);
});