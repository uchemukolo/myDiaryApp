import validator from 'validatorjs';
/**
 *
 *
 * @class Validate
 */
class Entry {
  /**
   *
   * @param {request} request
   *
   * @param {response} response
   *
   * @param {function} next
   *
   * @returns {Object} - JSON object and status code
   *
   * @memberof Entry
   */
  static entryId(request, response, next) {
    const { entryId } = entry.params;

    if (isNaN(entryId)) {
      return response.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    return next();
  }
  /**
   *
   * @param {object} request
   *
   * @param {object} response
   *
   * @param {unctionf} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
  */
  static createEntry(request, response, next) {
    const { title, mood, entry } = request.body;

    const entryData = { title, mood, entry};

    const entryDataRules = {
      title: 'required|string|min:6',
      mood: 'required|string',
      entry: 'required|string|min:6'
    };

    const validation = new Validator(entryData, entryDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400)
        .json({ message: errors });
    }
  }
}

export default Entry;

