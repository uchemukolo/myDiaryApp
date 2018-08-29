// import transporter from '../../config/transporter';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cron from 'node-cron';
import db from '../models/index';
import { fetchReminderData } from '../models/model.queries';


dotenv.config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_PROVIDER,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

cron.schedule('0 0 11 * * *', () => {
  db.query(fetchReminderData()).then((result) => {
    const userData = result.rows;
    userData.map((element) => {
      const usermail = element.email;
      const userName = element.name;
      const body = `<p><h3>Dear ${userName}</h3></p> <p>This is a quick email to remind you to write in your Diary!</p>
      <p><a href="https://uchemukolo.github.io/myDiaryApp">START WRITING</p><p><strong>My Diary Team</strong></p>`;
      const subject = 'Start your day by writing!';
      const emailOptions = {
        from: 'My Diary Team',
        to: usermail,
        subject,
        html: `<div>${body}</div>`,
      };
      return transporter.sendMail(emailOptions, (error) => {
        if (error) {
          return false;
        }
        return true;
      });
    });
  });
});

export default transporter;
