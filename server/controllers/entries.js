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
   *@description - Get all entries by a User
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
}
export default Entry;