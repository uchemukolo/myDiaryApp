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
      username, firstName, lastName, email, password
    } = request.body;
    if (!username) {
      return response.status(400).send({
        message: 'Please Enter Your Username'
      });
    }
    if ((!/^[a-zA-Z]*$/g.test(username))) {
      return response.status(400).send({
        message: 'Username must have alphabet characters only'
      });
    } if (!firstName) {
      return response.status(400).send({
        message: 'Please Enter Your First Name'
      });
    } if ((!/^[a-z A-Z]*$/g.test(firstName))) {
      return response.status(400).send({
        message: 'First Name must have alphabet characters only'
      });
    } if (!lastName) {
      return response.status(400).send({
        message: 'Please Enter Your Last Name'
      });
    } if ((!/^[a-z A-Z]*$/g.test(lastName))) {
      return response.status(400).send({
        message: 'Last Name must have alphabet characters only'
      });
    } if ((!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g.test(email))) {
      return response.status(400).send({
        message: 'Please Enter a valid Email'
      });
    } if (!password) {
      return response.status(400).send({
        message: 'Please Enter password'
      });
    } if (password.length < 6) {
      return response.status(400).send({
        message: 'Password is too short!'
      });
    } next();
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
    const { username, password } = request.body;
    if (!username || typeof username !== 'string') {
      response.status(400).send({
        message: 'Please enter Your username or email!'
      });
    } else if (!password) {
      response.status(400).send({
        message: 'Please enter Your Password!'
      });
    } next();
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
  static entry(request, response, next) {
    const {
      title, mood, entry
    } = request.body;
    if (!title) {
      response.status(400).send({
        message: 'Title field cannot be empty'
      });
    }
    if ((!/^[a-z A-Z]*$/g.test(title))) {
      return response.status(400).send({
        message: 'Title must have alphabet characters only'
      });
    } if (title.length < 5) {
      response.status(400).send({
        message: 'Title field must be 5 letters and above'
      });
    } else if (!mood) {
      response.status(400).send({
        message: 'Mood field cannot be empty'
      });
    } if ((!/^[a-z A-Z]*$/g.test(mood))) {
      return response.status(400).send({
        message: 'Mood field must have alphabet characters only'
      });
    } if (!entry) {
      response.status(400).send({
        message: 'Entry field cannot be empty'
      });
    } else if (entry.length < 20) {
      response.status(400).send({
        message: 'Entry field must be 20 letters and above'
      });
    }next();
  }
}

export default Validate;
