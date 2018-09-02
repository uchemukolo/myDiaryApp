import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import auth from '../helpers/authentication';
import db from '../models/index';
import Passwordmailer from '../helpers/resetPasswordMailer';
import {
  findOne, createUser, fetchUser, updateProfile, find, postReminder, updatePassword
} from '../models/model.queries';


dotenv.config();
/**
 * @description class for controlling all users routes
 * @class Users
 */
class Users {
  /**
   * @description controls user signup request
   * @param {Object} request request object
   * @param {Object} response response object
   * @return {Object} response containing the registered user
   * @memberof Users
   */
  static signUp(request, response) {
    const {
      email, username, password
    } = request.body;

    db.query(findOne(username, email))
      .then((results) => {
        if (results.rows[0]) {
          if (results.email === email) {
            return 'Email is already in use';
          }
          if (results.username === username.trim()) {
            return 'Username already taken';
          }
          return response.status(409).send({
            message: {
              error: ['User Already Exists, Please Login']
            }
          });
        }
        bcrypt.hash(password, 10).then((hashedPassword) => {
          db.query(createUser(username, email, hashedPassword))
            .then((result) => {
              const token = auth.createToken({
                id: result.rows[0].id,
                username,
                email: result.rows[0].email
              });
              return response.status(201).send({
                message: {
                  msgs: ['Signup Successful']
                },
                token,
              });
            });
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Signup Failed',
          error: error.message
        });
      });
  }

  /**
     *@description controls a user's signIn request
     *
     * @param {Object} request request object
     * @param {Object} response response object
     *
     * @return {Object} response containing the logged-in user
     *
     * @memberof Users
     */
  static signIn(request, response) {
    const {
      username, email, password,
    } = request.body;
    db.query(findOne(username, email))
      .then((result) => {
        if (!result.rows[0]) {
          return response.status(401).send({
            message: {
              error: ['Invalid Username or Email, please provide valid credentials']
            }
          });
        }
        bcrypt.compare(password, result.rows[0].password)
          .then((results) => {
            if (results === true) {
              const token = auth.createToken(result.rows[0]);
              return response.status(200).send({
                message: {
                  msgs: ['Login Successful!']
                },
                userDetails: {
                  id: result.rows[0].id,
                  username: result.rows[0].username,
                  email: result.rows[0].email
                },
                token
              });
            }
            return response.status(401).send({
              message: {
                error: ['Invalid Credentials, Please try again']
              }
            })
              .catch((error) => {
                response.status(500).send({
                  message: 'Server Error',
                  error: error.message,
                });
              });
          });
      });
  }

  /**
     *@description Method for retrieving users profile
     *
     * @param {Object} request request object
     * @param {Object} response response object
     *
     * @return {Object} response containing the logged-in user
     *
     * @memberof Users
     */
  static userProfile(request, response) {
    db.query(fetchUser(request.decoded.id))
      .then((result) => {
        console.log(result.rows[0]);

        return response.status(200).send({
          profile: {
            username: result.rows[0].username,
            firstName: result.rows[0].firstname,
            lastName: result.rows[0].lastname,
            email: result.rows[0].email,
            joinedSince: result.rows[0].createdat
          },
          message: 'Profile successfully retrieved',
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Some error occured',
          error: error.message,
        });
      });
  }

  /**
   *@description - Method for updating users profile
   *
   *@param {object} request - HTTP request
   *
   * @param {object} response
   *
   * @return {object} return object as response
   *
   * @memberof Users
   */
  static updateProfile(request, response) {
    const {
      firstName, lastName
    } = request.body;
    db.query(updateProfile(firstName, lastName, request.decoded.id))
      .then(updated => response.status(200).send({
        data: updated.rows[0],
        message: 'Profile updated sucessfully',
      }))
      .catch((error) => {
        response.status(500).send({
          message: 'Profile update Not sucessful!',
          error: error.message,
        });
      });
  }

  /**
   *@description - Method for getting user details to send daily reminder
   *
   *@param {object} request - HTTP request
   *
   * @param {object} response
   *
   * @return {object} return object as response
   *
   * @memberof Users
   */
  static addReminder(request, response) {
    const {
      email, name
    } = request.body;
    db.query(find(request.decoded.id))
      .then((result) => {
        if (result.rows[0]) {
          return response.status(400).send({
            message: 'You have Already Subscribed for Daily Email Reminder'
          });
        }
        db.query(postReminder(request.decoded.id, name, email))
          .then(results => response.status(201).send({
            reminder: results.rows[0],
            message: 'Request for Daily Reminder Successful'
          }));
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Some Error Occured',
          error: error.message,
        });
      });
  }

  /**
   *@description - Method for resetting user password
   *
   *@param {object} request - HTTP request
   *
   * @param {object} response
   *
   * @return {object} return object as response
   *
   * @memberof Users
   */
  static forgotPassword(request, response) {
    const {
      username, email
    } = request.body;
    db.query(findOne(username, email))
      .then((found) => {
        if (found.rows[0]) {
          const data = {
            id: found.rows[0].id,
            email: found.rows[0].email,
            username: found.rows[0].username
          };
          const token = auth.createToken(found.rows[0]);
          Passwordmailer.passwordResetEmail(data.username, data.id, token, data.email);
          return response.status(200).send({
            message: 'Password reset link has been sent to your email',
            data: token
          });
        } return response.status(404).send({
          message: 'Your Details were not found in the Database'
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Some Error Occured',
          error: error.message,
        });
      });
  }

  /**
   *@description - Method for changing user password
   *
   *@param {object} request - HTTP request
   *
   * @param {object} response
   *
   * @return {object} return object as response
   *
   * @memberof Users
   */
  static createNewPassword(request, response) {
    const { id, token, password } = request.body;
    db.query(fetchUser(request.decoded.id))
      .then((foundUser) => {
        if (token === null || undefined) {
          console.log(foundUser.rows[0].token);
          return response.status(400).json({
            message: 'Invalid token, please use a valid token'
          });
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        db.query(updatePassword(hashedPassword, request.decoded.id))
          .then((result) => {
            if (result.rows[0]) {
              const date = new Date();
              const { username, email } = result.rows[0];
              Passwordmailer.passwordChangeEmail(username, email);
              return response.status(200).send({
                message: 'Password successfully changed, please login with your new password',
                userDetails: {
                  id,
                  email: result.rows[0].email,
                  username: result.rows[0].username,
                  date
                }
              });
            }
            response.status(404).json({
              message: 'User not found in the database'
            });
          });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Some Error Occured',
          error: error.message,
        });
      });
  }
}
export default Users;
