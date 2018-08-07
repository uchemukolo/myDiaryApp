import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
let connectionString;
const env = process.env.NODE_ENV;

if (env === 'production') {
  connectionString = process.env.DATABASE_URL;
} else if (env === 'test') {
  connectionString = process.env.DATABASE_URL_TEST;
} else {
  connectionString = process.env.DATABASE_URL_DEV;
}
console.log('>>>>>>>>', env);
console.log('>>>>>>>', connectionString);


const pool = new Pool({
  connectionString,
});

const userDetails = `
DROP TABLE IF EXISTS userDetails cascade;
CREATE TABLE userDetails(
  id SERIAL PRIMARY KEY,
  username VARCHAR(40) not null unique,
  email VARCHAR(40) not null unique,
  password VARCHAR(255) not null,
  createdAt timestamp (0) without time zone default now()
)`;

const entries = `
DROP TABLE IF EXISTS entries cascade;
CREATE TABLE entries(
  id SERIAL PRIMARY KEY,
  userId int,
  title VARCHAR(40) not null,
  mood VARCHAR(40) not null,
  entry TEXT not null,
  createdAt timestamp (0) without time zone default now(),
  FOREIGN KEY (userId) REFERENCES userDetails(id)
)`;

const notification = `
DROP TABLE IF EXISTS notification cascade;
CREATE TABLE notification(
  id SERIAL PRIMARY KEY,
  userId int unique,
  name VARCHAR(40) not null,
  email VARCHAR(40) not null unique,
  createdAt timestamp (0) without time zone default now(),
  FOREIGN KEY (userId) REFERENCES userDetails(id)
)`;

pool.query(userDetails).then((response) => {
  if (response) {
    console.log('User table created');
  } else {
    console.log('Error creating userDetails table');
  }
  pool.query(entries).then((response) => {
    if (response) {
      console.log('Entries table created');
    } else {
      console.log('Error creating Entries Table');
    }
    pool.query(notification).then((response) => {
      if (response) {
        console.log('Notification table created');
      } else {
        console.log('Error creating Notification Table');
      }
      pool.end();
    });
  });
});
