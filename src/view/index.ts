import express from 'express';
import companyRouter from './company.routes';
import userRouter from './user.router';
import workOrderRouter from './work-order.router';

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.send('Hello World');
});

app.use(workOrderRouter);
app.use(userRouter);
app.use(companyRouter);
