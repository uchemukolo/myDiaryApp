import Validator from 'validatorjs';
/**
 *
 *
 * @class Validate
 */
class Validate {
  /**
   *
   * @param {request} req
   *
   * @param {response} res
   *
   * @param {function} next
   *
   * @returns {Object} - JSON object and status code
   *
   * @memberof Validate
   */
  static entryId(req, res, next) {
    const { entryId } = request.params;

    if (isNaN(entryId)) {
      return res.status(400).json({
        message: 'Parameter must be a number!'
      });
    }
    return next();
  }
  /**
   *
   * @param {object} req
   *
   * @param {object} res
   *
   * @param {unctionf} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
  */
  static createEntry(req, res, next) {
    const { title, mood, entry } = req.body;

    const entryData = { title, mood, entry};

    const entryDataRules = {
      title: 'required|string|min:6',
      mood: 'required|string|alpha',
      entry: 'required|string|min:6',
      entry: 'required|date'
    };

    const validation = new Validator(entryData, entryDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return res.status(400)
        .json({ message: errors });
    }
  }
    /**
   *
   * @param {object} req
   *
   * @param {object} res
   *
   * @param {unctionf} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
  */
 static modifyEntry(req, res, next) {
  const { title, mood, entry } = req.body;

  const entryData = { title, mood, entry};

  const entryDataRules = {
    title: 'string|min:6',
    mood: 'string|alpha',
    entry: 'string|min:6',
    entry: 'date'
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

export default Validate;

