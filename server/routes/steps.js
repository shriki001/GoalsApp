const { Router } = require('express');
const StepsController = require('../controllers/StepsController');

const router = Router();

router.get('/get__next__step_for_goal:/id', StepsController.GetNextStepOfGoal);
router.post('/create_step/:goal_id', StepsController.CreateGoalStep);
router.put('/update_step/:goal_id/:step_id', StepsController.UpdateGoalStep);
router.put('/complete_step/:goal_id/:step_id', StepsController.CompleteGoalStep);

module.exports = router;