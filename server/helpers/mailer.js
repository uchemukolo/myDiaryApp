import transporter from '../../config/transporter';

/**
 * @class Mailer controller for sending reminder emails to users
 *
 */
class Mailer {
  /**
   * @description - method for configuring email options
   *
   * @param {String} email - email address
   * @param {String} subject - subject of the email
   * @param {String} body - body of the email
   * @return {Object} response
   * @memberof Mailer
   */
  static emailSender(email, subject, body) {
    const emailOptions = {
      from: 'My Diary Team',
      to: email,
      subject,
      html: `<h3 style="background: white;padding: .5em;">My Diary</h3>
          <div style="padding: .5em;">${body}</div>`,
    };

    return transporter.sendMail(emailOptions, (err) => {
      if (err) {
        return false;
      }
      return true;
    });
  }

  /**
   * @description - method for sending remider mail to user
   *
   * @param {String} email - email address of the user
   * @param {String} name - firstname of the user
   * @return {Object} response
   * @memberof Mailer
   */
  static reminderMail(email, name) {
    const mail = `<p>Dear <b>${name}</b></p> <p>This is a quick email to remind you to write in your Diary!</p><p><strong>My Diary Team</strong></p>`;
    const subject = 'Start your day by writing!';
    Mailer.emailSender(email, subject, mail);
  }
}
export default Mailer;
