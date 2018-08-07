import dotenv from 'dotenv';
import db from '../models/index';
import {
  addEntry, fetchAll, fetchOne, fetch, update, removeEntry
} from '../models/model.queries';

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
          }

        });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Create Entry Failed',
          error: error.message,
        });
      });
  }

  /**
   *@description - Modify details of an entry
   *
   *@param {object} request - HTTP request
   *
   * @param {object} response
   *
   * @return {object} return object as response
   *
   * @memberof Entries
   */
  static modifyEntry(request, response) {
    const { entryId } = request.params;
    const {
      title, mood, entry
    } = request.body;
    db.query(fetch(entryId, request.decoded.id))
      .then((result) => {
        if (result.rows.length === 0) {
          return response.status(404).send({
            message: 'Entry does not Exist'
          });
        }
        const { createdat } = result.rows[0];
        const currentDate = new Date();
        const sameDay = currentDate.toDateString() === createdat.toDateString();
        if (!sameDay) {
          return response.status(400).json({
            message: 'Entry cannot be updated after the day entry was created expires'
          });
        }
        db.query(update(title, mood, entry, entryId, request.decoded.id))
          .then(updated => response.status(200).send({
            entry: updated.rows[0],
            message: 'Entry updated sucessfully',
          }));
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Entry update Not sucessful!',
          error: error.message,
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
      }))
      .catch((error) => {
        response.status(500).send({
          message: 'Server error',
          error: error.message,
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
          });
        }
        return response.status(404).json({
          message: 'Entry not found',
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Some error occured!',
          error: error.message,
        });
      });
  }
}
export default Entries;
