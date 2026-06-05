import router from 'express';

const userRouter = router.Router();

// Placeholder routes for User module
userRouter.get('/', (req, res) => {
  res.status(501).json({ message: 'User routes not implemented yet' });
});

export default userRouter;
