import express from 'express';
import User from '../../models/User';
import Joi from '@hapi/joi';

const router = express.Router();

router.post('/register', async (req, res) => {
  const schema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(2)
      .max(50)
      .required(),
    password: Joi.string().required()
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.sendStatus(400);
    return;
  };
  const { username, password } = req.body;
  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      console.log(exists);
      res.sendStatus(409);
      return;
    }
    const user = new User({
      username
    });
    await user.setPassword(password);
    await user.save();

    const data = user.serialize();
    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    res.send(data);
  } catch(err) {
    return new Error(err);
  }
});
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.sendStatus(401);
    return;
  }
  try {
    const user = await User.findByUsername(username);
    if (!user) {
      res.status(401).send('유저 아이디가 없습니다');
      return;
    }
    const valid = await user.checkPassword(password);
    if (!valid) {
      res.status(401).send('비밀번호가 맞지 않습니다.');
    }
    const data = user.serialize();
    const token = user.generateToken();
    res.cookie('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    res.send(data);
  } catch(err) {
    res.sendStatus(500);
    return;
  }

});
router.get('/check', (req, res) => {
  const { user } = res.locals;
  if (!user) {
    res.status(401).send('로그인중이 아닙니다');
  }
  res.send(user);
});
router.get('/logout', (req, res) => {
  res.cookie('access_token');
  res.status(204).send('logout!');
});

// 만들어놓긴했지만, 나만 사용할 것. 처음에 나 가입해놓고 없앨 기능이긴한데 그래도 만들어보자

export default router;