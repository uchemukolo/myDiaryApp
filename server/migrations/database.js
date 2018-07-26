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
DROP TABLE IF EXISTS userDetails cascade;
CREATE TABLE IF NOT EXISTS userDetails(
	userId SERIAL PRIMARY KEY,
	username VARCHAR(40) not null unique,
    firstName VARCHAR(40) not null,
    lastName VARCHAR(40) not null,
	email VARCHAR(40) not null unique,
	password VARCHAR(255) not null,
	created_at timestamp (0) without time zone default now()
	)`;

const entries = `
DROP TABLE IF EXISTS entries cascade;
CREATE TABLE IF NOT EXISTS entries(
  entryId SERIAL PRIMARY KEY,
  userId int,
  title VARCHAR(40) not null,
  mood VARCHAR(40) not null,
  entry TEXT not null,
  created_at timestamp (0) without time zone default now(),
  FOREIGN KEY (userId) REFERENCES userDetails(userId)
)`;

const notification = `
DROP TABLE IF EXISTS notification cascade;
CREATE TABLE IF NOT EXISTS notification(
	id SERIAL PRIMARY KEY,
	userId int unique,
	name VARCHAR(40) not null,
	email VARCHAR(40) not null unique,
	FOREIGN KEY (userId) REFERENCES userDetails(userId)
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


