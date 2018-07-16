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
  *@param {object} req - request object
   *
   * @param {object} res - responce object
   *
   * @return {object} return object as response
   *
   * @memberof Entry
   * */
  static getAll(req, res) {
    return res.status(200).send({
      message: 'Successful',
      entry: data,
      error: false
    });
  }
  /**
 *@description - Fetch one entry
 *@param {object} req - request object
 *
 * @param {object} res - responce object
 *
 * @return {object} return object as response
 *
 * @memberof Entry
*/
  static getOne(req, res) {
    for (let i = 0; i < entry.length; i++) {
      if (entry[i].entryId === parseInt(req.params.entryId, 10)) {
        return res.send({
          message: 'Successful',
          entry: data[i],
          error: false
        });
      }
    }
    return res.status(404).send({
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
  static createEntry(req, res) {
    const {
      title, mood, entry, date
    } = req.body;

    const entryId = data.length + 1;

    data.push({
      entryId, userId: 1, title, mood, entry, date
    });
    return res.status(201).send({
      message: 'Entry Created Successfully',
      entry: data,
      error: false
    });
  }
  /**
   *@description - Modify details of an entry
   *
   *@param {object} req - HTTP request
   *
   * @param {object} res
   *
   * @return {object} this - Class instance
   *
   * @memberof Entry
   */
  static modifyEntry(req, res) {
    for (let i = 0; i < entry.length; i++) {
      if (entry[i].entryId === parseInt(req.params.entryId, 10)) {
        entry[i].title = req.body.title;
        entry[i].mood = req.body.mood;
        entry[i].entry = req.body.entry;
        entry[i].date = req.body.date;
        return res.send({
          message: 'Update Successful',
          entry: data[i],
          error: false
        });
      }
    }
    return res.status(404).send({
      message: 'Entry not found',
      error: true
    });
  }

}
export default Entry;