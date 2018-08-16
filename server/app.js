import bodyParser from 'body-parser';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import entry from './routes/entryRoute';
import user from './routes/userRoute';


const app = express();

const port = parseInt(process.env.PORT, 10) || 9001;

app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  credentials: true,
}));

app.use('/api/v1/entries', entry);
app.use('/api/v1/auth', user);

app.get('*', (request, response) => response.status(200).send({
  message: 'Welcome To myDiary API!!!',
}));


app.listen(port, () => console.log(`server is up and running on localhost: ${port}`));


export default app;
