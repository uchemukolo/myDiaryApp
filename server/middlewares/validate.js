import Validator from 'validatorjs';
/**
 *
 *
 * @class Validate
 */
class Entry {
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
      mood: 'required|string|alpha',
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

