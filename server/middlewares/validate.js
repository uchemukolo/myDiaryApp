import Validator from 'validatorjs';

/**
 *
 *
 * @class Validate
 */
class Validate {
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
 * @memberof Validate
 */
  static userId(request, response, next) {
    const { userId } = request.params;

    if (isNaN(userId)) {
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
  static register(request, response, next) {
    const {
      username,
      firstName,
      lastName,
      email,
      password

    } = request.body;

    const userData = {
      username,
      firstName,
      lastName,
      email,
      password
    };

    const userDataRules = {
      username: 'required|string|min:5',
      firstName: 'required|string|alpha|min:2',
      lastName: 'required|string|alpha|min:2',
      email: 'required|string|email',
      password: 'required|min:6'
    };

    const validation = new Validator(userData, userDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();`1`
      return response.status(400)
        .send({ message: errors });
    }
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
  static login(request, response, next) {
    const {
      username,
      email,
      password
    } = request.body;

    const userData = {
      username: username || email,
      password
    };

    const userDataRules = {
      username: 'required|string',
      password: 'required|min:6',
    };

    const validation = new Validator(userData, userDataRules);
    if (validation.passes()) {
      next();
    } else {
      const errors = validation.errors.all();
      return response.status(400)
        .send({ message: errors });
    }
  }

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
 * @memberof Validate
 */
  static entryId(request, response, next) {
    const { entryId } = request.params;

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
   * @param {function} next
   *
   * @returns {object} - JSON object and status code
   *
   * @memberof Validate
  */
  static createEntry(request, response, next) {
    const { title, mood, entry } = request.body;

    const entryData = { title, mood, entry };

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
  static modifyEntry(request, response, next) {
    const { title, mood, entry } = request.body;

    const entryData = { title, mood, entry };

    const entryDataRules = {
      title: 'string|min:6',
      mood: 'string|alpha',
      entry: 'string|min:6'
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
