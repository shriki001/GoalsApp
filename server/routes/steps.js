const { Router } = require('express');
const StepsController = require('../controllers/StepsController');
const { requireAuth } = require('../middleware/auth');

const router = Router();

router.get('/get_next_step_for_goal:/id', requireAuth, StepsController.GetNextStepOfGoal);
router.post('/create_step/:goal_id', requireAuth, StepsController.CreateGoalStep);
router.put('/update_step/:goal_id/:step_id', requireAuth, StepsController.UpdateGoalStep);
router.put('/complete_step/:goal_id/:step_id', requireAuth, StepsController.CompleteGoalStep);

module.exports = router;