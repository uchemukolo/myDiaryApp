/**
 * @name createUser
 * @description script to create a new user
 * @param username, firstName, lastName, email, hashedPassword
 * @returns the object queried
 */

export const createUser = (username, firstName, lastName, email, hashedPassword) => ({
  text: `INSERT INTO userDetails(username, firstName, lastName, email, password)
    VALUES($1, $2, $3, $4, $5) RETURNING *`,
  values: [username, firstName, lastName, email, hashedPassword]
});

/**
 * @description for finding one or more items in a database
 * @name findOne
 * @param username or email
 * @returns the object queried
 */

export const findOne = (username, email) => ({
  text: 'SELECT username, email FROM userDetails WHERE username = $1 OR email = $2',
  values: [username, email]
});
