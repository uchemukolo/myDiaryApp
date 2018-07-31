import dotenv from 'dotenv';
import db from '../models/index';
import { addEntry, fetchAll, fetchOne, removeEntry } from '../models/model.queries';

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
          newEntry: {
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
      .then(result => response.status(200).send({
        message: 'Entries successfully retrieved from the database',
        Entry: result.rows,
        status: 'Successful'
      }))
      .catch((error) => {
        response.status(500).send({
          message: 'Server error',
          error: error.message,
          status: 'fail'
        });
      });
  }

  /**
   *@description - get one entries
   *
   *@param {object} request - request object
   *
   * @param {object} response - responce object
   *
   * @return {object} return object as response
   *
   * @memberof Entries
  */
  static getOne(request, response) {
    const { entryId } = request.params;

    db.query(fetchOne(entryId, request.decoded.id))
      .then((result) => {
        if (result.rows[0]) {
          return response.status(200).send({
            message: 'Entry successfully retrieved from the database',
            entry: result.rows[0],
            status: 'Successful',
          });
        }
        return response.status(404).json({
          message: 'Entry not found!'
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Some error occured!',
          error: error.message,
          status: 'fail'
        });
      });
  }

  /**
  *@description - Delete an Entry
   *
  *@param {object} request - request object
  *
  * @param {object} response - response object
  *
  * @return {object} return object as response
  *
  * @memberof Entries
  */
  static deleteEntry(request, response) {
    const { entryId } = request.params;

    db.query(removeEntry(entryId, request.decoded.id))
      .then((result) => {
        if (result.rows[0]) {
          return response.status(200).json({
            data: result.rows[0],
            message: 'Entry successfully deleted',
            status: 'Successful'
          });
        }
        return response.status(404).json({
          message: 'Entry not found',
          status: 'fail',
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Some error occured!',
          error: error.message,
          status: 'fail'
        });
      });
  }
}
export default Entries;
