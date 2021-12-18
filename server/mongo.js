const mongoose = require('mongoose');
const dbURI = `mongodb://db:27017/Goals`;

module.exports = mongoose.connect(`${dbURI}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(_ => {
    console.log('mongoDB connected...');
    const User = require('./models/User');
    const Goal = require('./models/Goals');
    User.countDocuments({}).then(async count => {
        if (count === 0) {
            await User.create({ name: 'trump', password: 'donald' });
            await User.create({ name: 'joe', password: 'biden1' });
            const t = await User.findOne({ name: 'trump' });
            const b = await User.findOne({ name: 'joe' });
            await Goal.create({
                createdBy: t._id, name: 'be a president of the U.S.A', description: 'make America greate again!', dueDate: new Date('2017-01-21'),
                steps: [{
                    name: 'election', description: 'Winning that', dueDate: new Date('2017-01-20'), completed: true
                }]
            });
            await Goal.create({
                createdBy: b._id, name: 'be a president of the U.S.A', description: 'replace trump', dueDate: new Date('2021-01-21'),
                steps: [{
                    name: 'election', description: 'Winning that', dueDate: new Date('2021-01-20'), completed: true
                }]
            })
        }
    });
});
