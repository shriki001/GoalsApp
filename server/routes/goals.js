const { Router } = require('express');
const GoalsController = require('../controllers/GoalsController');
const { requireAuth } = require('../middleware/auth');

const router = Router();

router.get('/get_goals', requireAuth, GoalsController.GetGoals);
router.post('/create_goal', requireAuth, GoalsController.CreateGoal);
router.put('/update_goal/:id', requireAuth, GoalsController.UpdateGoal);
router.put('/complete_goal/:id', requireAuth, GoalsController.CompleteGoal);

module.exports = router;