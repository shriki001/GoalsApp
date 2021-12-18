const Goals = require('../models/Goals');

module.exports.GetGoals = async (req, res) => {
    // await Goals.create({
    //     name: 'Goal1',
    //     description:'some des',
    //     steps:[{
    //         name:'step1',
    //         description:'des 1',
    //     },
    //     {
    //         name:'step2',
    //         description:'des 2',
    //     },
    //     {
    //         name:'step3',
    //         description:'des 3',
    //     },
    //     {
    //         name:'step4',
    //         description:'des 4',
    //     },
    //     {
    //         name:'step5',
    //         description:'des 5',
    //     }]
    // })
    const total = await Goals.countDocuments({});
    const goals = await Goals.find({}).catch(err => {
        console.error(err);
        return res.sendStatus(404);
    });
    return res.send({ goals, total });
}
module.exports.CreateGoal = async (req, res) => {

}
module.exports.UpdateGoal = async (req, res) => {

}
module.exports.CompleteGoal = async (req, res) => {

}