const mongoose = require('mongoose');
const dbURI = `mongodb://db:27017/Goals`;

module.exports = mongoose.connect(`${dbURI}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});