const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
} = require('../controllers/userController');
const {
  verifyTokenAndAuth,
  verifyTokenAndAdmin,
} = require('../middleware/authMiddleware');

const router = require('express').Router();

router.route('/').post(registerUser).get(verifyTokenAndAdmin, getAllUsers);
router.post('/login', loginUser);
router.get('/stats', verifyTokenAndAdmin, getUserStats);
// make sure /:id below otherwise login or stats will be sent as id
router
  .route('/:id')
  .put(verifyTokenAndAuth, updateUser)
  .delete(verifyTokenAndAuth, deleteUser)
  .get(verifyTokenAndAdmin, getUser);

module.exports = router;
