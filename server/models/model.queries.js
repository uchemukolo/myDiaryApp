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
  text: 'SELECT id, username, email, password FROM userDetails WHERE username = $1 OR email = $2',
  values: [username, email]
});

/**
 * @description script to add a new entry in a database
 * @name addEntry
 * @param title, mood, entry, userId
 * @returns the object queried
 */

export const addEntry = (title, mood, entry, userId) => ({
  text: 'INSERT INTO Entries(title, mood, entry, userId) VALUES ($1, $2, $3, $4) RETURNING *',
  values: [title, mood, entry, userId]
});

  /**
 * @description fetch all entries in a database by ID
 * @name fetchAll
 * @param userId
 * @returns the object queried
 */

export const fetchAll = userId => ({
  text: 'SELECT * FROM entries WHERE userId = $1',
  values: [userId],
});

  /**
 * @description fetch one entry in a database by ID
 * @name fetchOne
 * @param entryId
 * * @param userId
 * @returns the object queried
 */

export const fetchOne = (id, userId) => ({
  text: 'SELECT * FROM entries WHERE id = $1 AND userId = $2',
  values: [id, userId],
});

/**
 * @description delete one entry in the database by ID
 * @name fetchOne
 * @param userId
 * @returns the object queried
 */

export const removeEntry = (id, userId) => ({
  text: 'DELETE FROM entries WHERE id = $1 AND userId = $2 RETURNING *;',
  values: [id, userId],
});

