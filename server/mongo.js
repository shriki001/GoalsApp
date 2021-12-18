const mongoose = require('mongoose');

const dbURI = `mongodb://localhost:27017/Goals`;

const initClientDbConnection = _ => {
    const db = mongoose.createConnection(`${dbURI}`, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });
    db.once("open", _ => {
        console.log('info', "client MongoDB Connection ok!");
    });
    require('require-all')(__dirname + '/models');
    return db;
}

module.exports = {
    initClientDbConnection
};