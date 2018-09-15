import Validator from 'validatorjs';

/**
 *
 *
 * @class Validate
 */
class Validate {
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
      email,
      password,
      confirmPassword
    } = request.body;

    if (password !== confirmPassword) {
      return response.status(400).send({
        password: 'password does not match'
      });
    }

    const userData = {
      username,
      email,
      password
    };

    const userDataRules = {
      username: 'required|string|min:5',
      email: 'required|string|email',
      password: 'required|min:6'
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
    * @param {object} request
    *
    * @param {object} response
    *
    * @param {unction} next
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
      title: 'required|string',
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
    if (!title || !mood || !entry) {
      return response.status(400).send({
        message: 'Fields cannot be empty'
      });
    }

    const entryData = { title, mood, entry };

    const entryDataRules = {
      title: 'string',
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
  static addReminder(request, response, next) {
    const { name, email } = request.body;

    const entryData = { name, email };

    const entryDataRules = {
      name: 'required|string',
      email: 'required|string|email',
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
