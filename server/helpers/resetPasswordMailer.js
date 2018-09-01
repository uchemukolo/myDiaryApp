import transporter from './mailer';


const Passwordmailer = {

  emailSender: (emailAddress, subject, body) => {
    const emailOptions = {
      from: 'My Diary Team',
      to: emailAddress,
      subject,
      html: `<div style="padding: .5em;">${body}</div>`
    };
    return transporter.sendMail(emailOptions, (error) => {
      if (error) {
        return false;
      }
      return true;
    });
  },
  passwordResetEmail: (username, id, token, email) => {
    const subject = 'New Password reset link';
    const message = `<p>Dear ${username},
    </p> <p>kindly click on
    <a href="https://uchemukolo.github.io/myDiaryApp/public/reset-password.html?id=${id}&token=${token}">Reset password</a>
    to create a new password</p>
    <p><strong>CHEERS!</strong></p>`;
    Passwordmailer.emailSender(email, subject, message);
  },
  passwordChangeEmail: (username, email) => {
    const subject = 'Password successfully changed';
    const message = `<p>Dear <b>${username}</b>,
    <p>Your password has been successfully changed, kindly login with your new Password.</p>;
    <p><strong>CHEERS!</strong></p>`;
    Passwordmailer.emailSender(email, subject, message);
  }
};
export default Passwordmailer;
