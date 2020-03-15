import express from 'express';
import next from 'next';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import apis from './router';
import jwtMiddleware from './lib/jwtMiddleware';
import '../config/server/db';
import '../models/User';

const PORT = process.env.PROT || 3000;
const dev = process.env.MODE_DEV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.urlencoded({ extended: false })); // extends =>객체가 전달되는 방식에서 차이가 있다.
    server.use(bodyParser.json());
    server.use(helmet());
    server.use(compression());
    server.use(cookieParser());
    server.use(jwtMiddleware);
    server.use('/api', apis);

    server.get('*', (req, res) => {
      return handle(req, res)
    });

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Server is Running NOW ${PORT}`);
     });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
  