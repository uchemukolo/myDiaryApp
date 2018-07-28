const { Pool } = require('pg');
const dotenv = require('dotenv');

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
DROP TABLE IF EXISTS userDetails cascade`;

const entries = `
DROP TABLE IF EXISTS entries cascade`;

const notification = `
DROP TABLE IF EXISTS notification cascade`;


pool.query(userDetails).then((response) => {
  if (response) {
    console.log('User Table Dropped');
  } else {
    console.log('Error dropping User table');
  }
  pool.query(entries).then((response) => {
    if (response) {
      console.log('Entries Table Dropped');
    } else {
      console.log('Error dropping entries table');
    }
    pool.query(notification).then((response) => {
      if (response) {
        console.log('Notification Table Dropped');
      } else {
        console.log('Error dropping notification table');
      }
      pool.end();
    });
  });
});
