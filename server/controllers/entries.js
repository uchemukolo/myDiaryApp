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
   * @memberof Request
     */
  static getOne(req,res){
		for(let i=0; i < entry.length; i++){
			if(request[i].entryId === parseInt(req.params.entryId, 10)){
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
}
export default Entry;