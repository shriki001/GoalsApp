const Goals = require('../models/Goals');
const GoalStep = require('../models/GoalStep');

async function UpdateGoalStep(payload, res) {
    const { goal_id, step_id, toUpdate } = payload;
    const { name, description, completed } = toUpdate;
    const goal = await Goals.findById(goal_id);
    if (goal) {
        const stepIndex = goals.steps.findIndex(s => s._id === step_id);
        if (stepIndex !== -1) {
            goals.steps[stepIndex].completed === completed;
            goals.steps[stepIndex].name === name;
            goals.steps[stepIndex].description === description;
            goal.save()
                .then(status => {
                    return res.send(status);
                })
                .catch(e => {
                    return res.sendStatus(400).send(e);
                });
        }
        else return res.sendStatus(404).send('step not found')
    }
    else return res.sendStatus(404).send('goal not found')
}

module.exports.GetNextStepOfGoal = async (req, res) => {

}

module.exports.CreateGoalStep = async (req, res) => {
    const { params, body } = req;
    const { goal_id } = params;
    const newStep = new GoalStep(body);
    const goal = await Goals.findById(goal_id);
    if (goal) {
        goal.steps.push(newStep);
        goal.save()
            .then(status => {
                return res.send(status);
            })
            .catch(e => {
                return res.sendStatus(400).send(e);
            });
    }
    else return res.sendStatus(404).send('Goal not found');
}

module.exports.UpdateGoalStep = async (req, res) => {
    const { params, body } = req;
    const { goal_id, step_id } = params;
    return UpdateGoalStep({ goal_id, step_id, ...body }, res);
}

module.exports.CompleteGoalStep = async (req, res) => {
    const { params } = req;
    const { goal_id, step_id } = params;
    return UpdateGoalStep({ goal_id, step_id, ...{ completed: true } }, res);
}