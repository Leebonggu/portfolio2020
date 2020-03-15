import jwt from 'jsonwebtoken';
import User from '../../models/User';

const jwtMiddleware = async (req, res, next) => {
  const { access_token } = req.cookies;
  if (!access_token) return next();
  try {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    res.locals.user = {
      _id: decoded._id,
      username: decoded.username,
      admin: decoded.admin,
    }
    const now = Math.floor(Date.now() / 1000);
    if (decoded.exp - now < 60 * 60* 24 * 3.5) {
      const user = await User.findById(decoded._id);
      const token = user.generateToken();
      res.cookie('access_token', token, {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      });
    }
    return next();
  } catch(err) {
    console.log(err);
    return next();
  }
}

export default jwtMiddleware;
