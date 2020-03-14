import express from 'express';
import auth from './auth';
import post from './post';
import economy from './economy';
import manage from './manage';

const router = express.Router();

router.use('/auth', auth);
router.use('/post', post);
router.use('/ecnomy', economy);
router.use('/manage', manage);

export default router;
