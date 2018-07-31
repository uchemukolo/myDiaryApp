import dotenv from 'dotenv';
import db from '../models/index';
import { addEntry, fetchAll } from '../models/model.queries';

dotenv.config();


/**
 *
 *@description - Class Definition for the Entry class
 *
 * @export
 *
 * @class Entries
 */
class Entries {
  /**
  *@description - Create an Enrty
   *
  *@param {object} request - request object
  *
  * @param {object} response - response object
  *
  * @return {object} return object as response
  *
  * @memberof Entries
  */
  static createEntry(request, response) {
    const {
      title, mood, entry
    } = request.body;
    db.query(addEntry(title, mood, entry, request.decoded.id))
      .then((result) => {
        response.status(201).send({
          message: 'Entry Created Successfully',
          newRequest: {
            id: result.rows[0].id,
            userId: request.decoded.id,
            title,
            mood,
            entry,
            status: 'Successful'
          }

        });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Create Entry Failed',
          error: error.message,
          status: 'fail'
        });
      });
  }

  /**
   *@description - Fetch all entries
  *@param {object} request - request object
   *
   * @param {object} response - responce object
   *
   * @return {object} return object as response
   *
   * @memberof Entry
   * */
  static getAll(request, response) {
    db.query(fetchAll(request.decoded.id))
      .then((result) => {
        if (result.rows.length > 0) {
          return response.status(200).send({
            message: 'Entries successfully retrieved from the database',
            requests: result.rows,
            status: 'Successful'
          });
        }
        return response.status(200).send([]);
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Server error',
          error: error.message,
          status: 'fail'
        });
      });
  }
}
export default Entries;
