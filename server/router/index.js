import express from 'express';
import auth from './auth';
import posts from './posts';
import economy from './economy';
import manage from './manage';

const router = express.Router();

router.use('/auth', auth);
router.use('/posts', posts);
router.use('/ecnomy', economy);
router.use('/manage', manage);

export default router;
