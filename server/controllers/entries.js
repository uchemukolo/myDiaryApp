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
        return response.status(404).send({
          message: 'No Entry for this user',
          status: 'fail'
        });
      })
      .catch((error) => {
        response.status(500).send({
          message: 'Some Error Occured',
          error: error.message,
          status: 'fail'
        });
      });
  }

//   /**
//  *@description - Fetch one entry
//  *@param {object} request - request object
//  *
//  * @param {object} response - responce object
//  *
//  * @return {object} return object as response
//  *
//  * @memberof Entry
// */
//   static getOne(request, response) {
//     const index = entry.findIndex(item => item.entryId === parseInt(request.params.entryId, 10)); {
//       if (!index) {
//         return response.send({
//           message: 'Successful',
//           entry: data[index],
//           error: false
//         });
//       }
//     }
//     return response.status(404).send({
//       message: 'Entry not found!',
//       error: true
//     });
//   }

//   /**
// *@description - Create an Enrty
//  *
// *@param {object} request - request object
// *
// * @param {object} response - response object
// *
// * @return {object} return object as response
// *
// * @memberof Entry
// */
//   static createEntry(request, response) {
//     const {
//       title, mood, entry, date
//     } = request.body;

//     const entryId = data.length + 1;

//     data.push({
//       entryId, userId: 1, title, mood, entry, date
//     });
//     return response.status(201).send({
//       message: 'Entry Created Successfully',
//       entry: data,
//       error: false
//     });
//   }

//   /**
//    *@description - Modify details of an entry
//    *
//    *@param {object} request - HTTP request
//    *
//    * @param {object} response
//    *
//    * @return {object} this - Class instance
//    *
//    * @memberof Entry
//    */
//   static modifyEntry(request, response) {
//     const index = entry.findIndex(item => item.entryId === parseInt(request.params.entryId, 10)); {
//       if (!index) {
//         entry[index].title = request.body.title;
//         entry[index].mood = request.body.mood;
//         entry[index].entry = request.body.entry;
//         entry[index].date = request.body.date;
//         return response.status(200).send({
//           message: 'Update Successful',
//           entry: data[index],
//           error: false
//         });
//       }
//     }
//     return response.status(404).send({
//       message: 'Entry not found',
//       error: true
//     });
//   }

//   /**
//   *@description - Delete an Entry
//    *
//   *@param {object} request - request object
//   *
//   * @param {object} response - response object
//   *
//   * @return {object} return object as response
//   *
//   * @memberof Entries
//   */
//   static deleteEntry(request, response) {
//     const index = entry.findIndex(item => item.entryId === parseInt(request.params.entryId, 10)); {
//       entry.splice(index, 1);
//       if (!index) {
//         return response.status(200).send({
//           message: 'Entry Deleted',
//           error: false
//         });
//       }
//     }
//     return response.status(404).send({
//       message: 'Entry not found',
//       error: true
//     });
//   }
}
export default Entries;
