const Goals = require('../models/Goals');

function UpdateGoal(payload, res) {
    const { id, toUpdate } = payload;
    Goals.findOneAndUpdate({ _id: id }, toUpdate)
        .then(status => {
            return res.send(status);
        })
        .catch(e => {
            return res.sendStatus(400).send(e);
        });
}

module.exports.GetGoals = async (req, res) => {
    const PAGE_SIZE = 2;
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
    const { user } = req;
    const page = parseInt(req.query.page || "0");
    const total = await Goals.countDocuments({ createdBy: user._id });
    const goals = await Goals.find({ createdBy: user._id })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page)
        .catch(err => {
            console.error(err);
            return res.sendStatus(404);
        });
    return res.send({
        goals, total, rowPerPage: PAGE_SIZE
    });
}

module.exports.CreateGoal = async (req, res) => {
    Goals.create(req.body)
        .then(_ => {
            return res.send('Goal created!');
        })
        .catch(e => {
            return res.sendStatus(400).send(e);
        });

}

module.exports.UpdateGoal = async (req, res) => {
    const { params, body } = req;
    const { id } = params;
    return UpdateGoal({ id, ...body }, res);
}

module.exports.CompleteGoal = async (req, res) => {
    const { id } = req.params;
    return UpdateGoal({ id, ...{ complete: true } }, res);
}