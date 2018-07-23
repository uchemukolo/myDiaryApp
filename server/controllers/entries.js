import data from '../models/data';

const entry = data;
/**
 *
 *@description - Class Definition for the Entry class
 *
 * @export
 *
 * @class Entry
 */
class Entry {
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
    return response.status(200).send({
      message: 'Successful',
      entry: data,
      error: false
    });
  }
  /**
 *@description - Fetch one entry
 *@param {object} request - request object
 *
 * @param {object} response - responce object
 *
 * @return {object} return object as response
 *
 * @memberof Entry
*/
  static getOne(request, response) {
    for (let i = 0; i < entry.length; i++) {
      if (entry[i].entryId === parseInt(request.params.entryId, 10)) {
        return response.send({
          message: 'Successful',
          entry: data[i],
          error: false
        });
      }
    }
    return response.status(404).send({
      message: 'Entry not found!',
      error: true
    });
  }
  /**
*@description - Create an Enrty
 *
*@param {object} request - request object
*
* @param {object} response - response object
*
* @return {object} return object as response
*
* @memberof Entry
*/
  static createEntry(request, response) {
    const {
      title, mood, entry, date
    } = request.body;

    const entryId = data.length + 1;

    data.push({
      entryId, userId: 1, title, mood, entry, date
    });
    return response.status(201).send({
      message: 'Entry Created Successfully',
      entry: data,
      error: false
    });
  }
  /**
   *@description - Modify details of an entry
   *
   *@param {object} request - HTTP request
   *
   * @param {object} response
   *
   * @return {object} this - Class instance
   *
   * @memberof Entry
   */
  static modifyEntry(request, response) {
    for (let i = 0; i < entry.length; i++) {
      if (entry[i].entryId === parseInt(request.params.entryId, 10)) {
        entry[i].title = request.body.title;
        entry[i].mood = request.body.mood;
        entry[i].entry = request.body.entry;
        entry[i].date = request.body.date;
        return response.send({
          message: 'Update Successful',
          entry: data[i],
          error: false
        });
      }
    }
    return response.status(404).send({
      message: 'Entry not found',
      error: true
    });
  }

}
export default Entry;